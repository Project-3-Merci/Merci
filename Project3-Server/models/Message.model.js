const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const messageSchema = new Schema({
  content: { type: String },
  sender: { type: Schema.Types.ObjectId, ref:"user" },
  receiver: { type: Schema.Types.ObjectId, ref:"user"}
});

module.exports = model("Message", messageSchema);
