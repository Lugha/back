"use strict";

const db = require("../src/services/mongo");

module.exports.up = async function() {
  await db.connect();

  const conn = await db.getConnect();

  await conn.collection("operations").insertMany([
    {
      expression: "five + five",
      response: 10
    },
    {
      expression: "three + five",
      response: 8
    },
    {
      expression: "two + eight",
      response: 10
    },
    {
      expression: "two + three",
      response: 5
    },
    {
      expression: "zero + one",
      response: 1
    }
  ]);
};

module.exports.down = async function() {
  await db.connect();

  const conn = await db.getConnect();

  await conn.collection("operations").deleteMany({});
};
