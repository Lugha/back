"use strict";

const db = require("../src/utils/mongoForMigration");

module.exports.up = async function(next) {
  await db.connect();

  const conn = await db.getConnect();

  await conn.collection("users").insertMany([
    {
      username: "jalil",
      password: "admin"
    },
    {
      username: "alex",
      password: "admin"
    },
    {
      username: "sinane",
      password: "admin"
    }
  ]);

  next();
};

module.exports.down = async function(next) {
  await db.connect();

  const conn = await db.getConnect();

  await conn.collection("users").deleteMany({});

  next();
};
