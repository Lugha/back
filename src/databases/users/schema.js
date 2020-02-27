import { Schema } from "mongoose";

export default new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  socketId: {
    type: String,
    unique: true
  }
});
