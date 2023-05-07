const mongoose = require('mongoose');


const authSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  company:{type:String,required:true},
  user_id:{type:Number,required:true},
  user_type:{type:Number,required:true},
  deleted:{type:Boolean,default:false},
  verified:{type:Boolean,default:false},
});


const Auth = mongoose.model('Auth', authSchema);


module.exports = Auth;
