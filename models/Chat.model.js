const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const chatSchema = new Schema({
  user1: { type: Schema.Types.ObjectId, ref:"user"},
  user2: { type: Schema.Types.ObjectId, ref:"user"},
  messagess :[{ type: Schema.Types.ObjectId, ref:"message"}]
});

module.exports = model("Chat", chatSchema);