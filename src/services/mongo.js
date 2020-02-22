import mongoose from "mongoose";

import configs from "../configs";

export async function connect() {
  await mongoose.connect(configs.mongo_uri, {
    useNewUrlParser: true
  });
  console.log("Mongo Connected");
}

export const getConnect = () => mongoose.connection;

export async function close() {
  await mongoose.disconnect();
  console.log("Mongo Disconnected");
}

export default {
  connect,
  getConnect,
  close
};
