/* eslint class-methods-use-this: "off" */

import * as db from "@services/mongo";
import MigrationModel from "@databases/migrations";

class dbStore {
  async load(fn) {
    try {
      await db.connect();
      const data = await MigrationModel.findOne();
      return data ? fn(null, data) : fn(null, {});
    } catch (err) {
      return fn(err);
    }
  }

  async save(set, fn) {
    try {
      await db.connect();
      const result = await MigrationModel.updateMany(
        {},
        {
          $set: { lastRun: set.lastRun },
          $push: { migrations: { $each: set.migrations } }
        },
        { upsert: true, multi: true }
      );
      return fn(null, result);
    } catch (err) {
      return fn(err);
    }
  }
}

module.exports = dbStore;
