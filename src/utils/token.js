import jwt from "jsonwebtoken";

import configs from "../configs";

export function newToken(user) {
  const token = jwt.sign({ user_id: String(user._id) }, configs.privateKey, {
    algorithm: "RS256"
  });

  return token;
}
