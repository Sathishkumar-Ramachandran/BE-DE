const mongoose = require('mongoose');


const chatSchema = new mongoose.Schema({
  name: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  company:{type:String,required:true},
  user_id:{type:Number,required:true},
  
});


const Auth = mongoose.model('Auth', authSchema);


module.exports = Auth;
