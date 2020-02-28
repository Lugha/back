import log4js from "log4js";
import { UNAUTHORIZED } from "http-status";
import jwt from "jsonwebtoken";

import usersModel from "../databases/users";
import configs from "../configs";

const logger = log4js.getLogger("AUTHORIZATION");

export function authorization() {
  return async (req, res, next) => {
    try {
      logger.info("Check token");

      const bearer = req.headers.authorization || req.query.token;
      if (!bearer) {
        return res.sendStatus(UNAUTHORIZED);
      }
      const token = bearer.split("Bearer ");

      const result = await jwt.verify(token[1], configs.publicKey, {
        algorithm: "RS256"
      });
      const user = await usersModel.findOne({ _id: result.user_id });

      if (!user) {
        logger.warn("User not found");

        return res.sendStatus(UNAUTHORIZED);
      }

      logger.info(`User authorized => ${user}`);
      req.user = user;
      return next();
    } catch (err) {
      return res.sendStatus(UNAUTHORIZED);
    }
  };
}
