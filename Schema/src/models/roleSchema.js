const mongoose = require("mongoose");


const roleSchemaStrcuture = mongoose.Schema({
    schema: { type: Array, required: true },
    mongo_schema:{type:Array,required:true},
    createdTime: { type: Date, required: false, default: new Date() },
    updatedTime: { type: Date, required: false },
    companyId: { type: String, require: true },
  });

  const roleschema = mongoose.model("roleSchemaStrcutures", roleSchemaStrcuture);


module.exports = roleschema;