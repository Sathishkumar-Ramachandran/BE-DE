const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user_id:{type:Number,required:true},
  role: { type: String, required: true},
    
});


const User = mongoose.model('user', userSchema);


module.exports = User;
