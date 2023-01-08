const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  budget: {
    type: Number,
    default: 0,
  },
  spend: {
    type: Number,
    default: 0,
  },
  payment: {
    type: [{ name: String, amount: Number }],
    default: [],
  },
  friends : {
    type : [{id : mongoose.Schema.Types.ObjectId, name : String, amount : Number}],
    ref : 'user',
    default : []
  }
});

const user = mongoose.model("user", UserSchema);
module.exports = user;
