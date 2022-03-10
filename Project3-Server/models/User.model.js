const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  aboutMe: {type:String, default: ""},
  age :{type: Number},
  profileImg: { type: String, default:"http://cdn.onlinewebfonts.com/svg/img_574534.png"},
  acceptedFavours: [{type: Schema.Types.ObjectId, ref:"favours"}],
  requestedFavours: [{type: Schema.Types.ObjectId, ref:"favours"}],
  toke: {type: Number, default: 100}
});

module.exports = model("User", userSchema);
