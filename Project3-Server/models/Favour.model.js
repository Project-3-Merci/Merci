const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const favourSchema = new Schema({
  asker: { type: Schema.Types.ObjectId, ref:"user" },
  taker: { type: Schema.Types.ObjectId, ref:"user", default: null },
  description: { type: String },
  location: { type: String },
  locationLat: { type: Number },
  locationLong: { type: Number },
  token: { type: Number }
});

module.exports = model("Favour", favourSchema);
