import { Schema } from "mongoose";

export default new Schema({
  lastRun: {
    type: String,
    required: true,
    index: true
  },
  migrations: [
    new Schema({
      title: {
        type: String,
        required: true
      },
      timestamp: {
        type: String,
        required: true
      }
    })
  ]
});
