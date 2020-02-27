import { OK } from "http-status";

import UserModel from "../../../databases/users";

async function put(req, res) {
    await UserModel.updateOne({ _id: req.user._id }, req.body);
    res.status(OK).end();
}

export default put;
