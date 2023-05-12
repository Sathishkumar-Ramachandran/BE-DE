const mongoose = require("mongoose");


const userSchemaStrcuture = mongoose.Schema({
    schema: { type: Array, required: true },
    mongo_schema:{type:Array,required:true},
    createdTime: { type: Date, required: false, default: new Date() },
    updatedTime: { type: Date, required: false },
    companyId: { type: String, require: true },
  });

  const userschema=mongoose.model("userSchemaStrcutures", userSchemaStrcuture);


module.exports =userschema;