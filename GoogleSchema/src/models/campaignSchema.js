const mongoose = require("mongoose");


const campaignSchemaStrcuture = mongoose.Schema({
    schema: { type: Array, required: true },
    campaignID: {type: String, required: false},
    mongo_schema:{type:Array,required:true},
    createdTime: { type: Date, required: false, default: new Date() },
    updatedTime: { type: Date, required: false },
    companyId: { type: String, require: true },
    
  });

  const campaignSchema = mongoose.model("campaignSchemaStrcuture", campaignSchemaStrcuture);


module.exports = campaignSchema;