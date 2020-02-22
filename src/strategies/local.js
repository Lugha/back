import { Strategy } from "passport-local";
import passport from "passport";

import usersModel from '../databases/users';

passport.use(
  "local-login",
  new Strategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    (username, password, done) => {
      usersModel.findOne({ username }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (!user || !usersModel.comparePasswordAndHash(password, user.password)) {
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
      usersModel.findOne({ username }, async (err, result) => {
        if (result) {
          return done("That username is already taken.", false);
        }

        const user = await usersModel.create({
          username,
          password: usersModel.generateHash(password)
        });

        return done(null, user);
      });
    }
  )
);
