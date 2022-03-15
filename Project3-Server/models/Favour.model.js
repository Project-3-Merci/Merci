const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const favourSchema = new Schema({
  asker: { type: Schema.Types.ObjectId, ref:"user" , default: null},
  taker: { type: Schema.Types.ObjectId, ref:"user", default: null },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String },
  token: { type: Number },
  photo:{type: String}
});

module.exports = model("Favour", favourSchema);
