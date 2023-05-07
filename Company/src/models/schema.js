 const mongoose=require('mongoose');


 const companySchema=new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now },
  companyName:{type:String,required:true,unique:true},
  user_id:{type:Number,required:true},
  deleted:{type:Boolean,default:false},
  status:{type:String,default:'Active',required:true},
  verified:{type:Boolean,default:false},
  plan_id:{type:Number,required:true},
  expired_on:{type:Date(),required:false},
  companyAddress:{
     City:{type:String},
     State:{type:String},
     Country:{type:String},
     ZipCode:{type:String},
     Phone:{type:String},
  }
 })

 const CompanyInfo = mongoose.model('CompanyInfo', companySchema);


module.exports = CompanyInfo;
