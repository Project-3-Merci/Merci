const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const favourSchema = new Schema({
  asker: { type: Schema.Types.ObjectId, ref:"user" , default: null},
  taker: { type: Schema.Types.ObjectId, ref:"user", default: null },
  description: { type: String },
  location: { type: String },
  locationLat: { type: Number },
  locationLong: { type: Number },
  token: { type: Number },
  photo:{type: String},
  completed:{type:Boolean, default: false}
});

module.exports = model("Favour", favourSchema);
