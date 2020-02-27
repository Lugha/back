import pluginRandom from "mongoose-simple-random";
import { Schema } from "mongoose";

const schema = new Schema({
  sentence: {
    type: String,
    required: true,
    unique: true
  },
  traductions: {
    type: [
      new Schema({
        text: {
          type: String,
          required: true
        },
        success: {
          type: Boolean,
          required: true
        }
      })
    ],
    required: true
  }
});

schema.plugin(pluginRandom);

export default schema;
