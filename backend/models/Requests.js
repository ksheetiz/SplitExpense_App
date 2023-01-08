const mongoose = require('mongoose');
const { Schema } = mongoose;

const RequestSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    requester :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    name : {
        type : String,
        required : true
    },
    amount : {
        type : Number,
        required : true,
    },
    date : {
        type : Date,
        default : Date.now,
    },
  });

  const request = mongoose.model('request',RequestSchema);
  module.exports = request;