const mongoose = require("mongoose");


const adsetSchemaStrcuture = mongoose.Schema({
    schema: { type: Array, required: true },
    mongo_schema:{type:Array,required:true},
    status: {type: String, required: true},
    createdTime: { type: Date, required: false, default: new Date() },
    updatedTime: { type: Date, required: false },
    companyId: { type: String, require: true },
  });

  const adsetSchema = mongoose.model("adsetSchemaStrcuture", adsetSchemaStrcuture);


module.exports = adsetSchema;