import { newToken } from "../../../../utils/token";

export default (req, res) => {
  const token = newToken(req.user);

  res.send({ token });
};
