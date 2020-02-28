import log4js from "log4js";
import { Strategy } from "passport-local";
import passport from "passport";

import usersModel from "../databases/users";

const logger = log4js.getLogger("PASSPORT:LOCAL");
logger.level = 'debug';

passport.use(
  "local-login",
  new Strategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    (username, password, done) => {
      logger.info(`Attempt login user => ${username}`);

      usersModel.findOne({ username }, (err, user) => {
        if (err) {
          logger.fatal("Cannot found user");
          return done(err);
        }

        if (
          !user ||
          !usersModel.comparePasswordAndHash(password, user.password)
        ) {
          logger.fatal("User not found");
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

passport.use(
  "local-register",
  new Strategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    (req, username, password, done) => {
      logger.info(`Attempt login user => ${username}`);

      usersModel.findOne({ username }, async (err, result) => {
        if (result) {
          return done("Username already taken.", false);
        }

        const user = await usersModel.create({
          username,
          password: usersModel.generateHash(password)
        });

        logger.info('User created');

        return done(null, user);
      });
    }
  )
);
