const mongoose = require("mongoose");

const configs = require("../configs");

async function connect() {
  await mongoose.connect(configs.mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("Mongo Connected");
}

async function getConnect() {
  return mongoose.connection;
}

async function close() {
  await mongoose.disconnect();
  console.log("Mongo Disconnected");
}

module.exports = {
  connect,
  getConnect,
  close
};
