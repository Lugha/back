import { UNAUTHORIZED } from 'http-status';
import jwt from 'jsonwebtoken';

import usersModel from '../databases/users';
import configs from '../configs';

export function authorization() {
  return async (req, res, next) => {
    try {
      const bearer = req.headers.authorization || req.query.token;
      if (!bearer) {
        return res.sendStatus(UNAUTHORIZED);
      }
      const token = bearer.split('Bearer ');

      const result = await jwt.verify(token[1], configs.publicKey, { algorithm: 'RS256' });
      const user = await usersModel.findOne({ _id: result.user_id });

      if (!user) {
        return res.sendStatus(UNAUTHORIZED);
      }

      req.user = user;
      return next();
    } catch (err) {
      return res.sendStatus(UNAUTHORIZED);
    }
  };
}