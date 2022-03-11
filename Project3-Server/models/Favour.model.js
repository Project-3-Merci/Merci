const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const favourSchema = new Schema({
  asker: { type: Schema.Types.ObjectId, ref:"user" , default: null},
  taker: { type: Schema.Types.ObjectId, ref:"user", default: null },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  locationLat: { type: Number },
  locationLong: { type: Number },
  token: { type: Number },
  photo:{type: String}
});

module.exports = model("Favour", favourSchema);
