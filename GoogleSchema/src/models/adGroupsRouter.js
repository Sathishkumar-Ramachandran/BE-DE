const mongoose = require('mongoose');

const adGroupsRouter = mongoose.Schema({
    schema: { type: Array, required: true },
    mongo_schema:{type:Array,required:true},
    status: {type: String, required: true},
    createdTime: { type: Date, required: false, default: new Date() },
    updatedTime: { type: Date, required: false },
    companyId: { type: String, require: true },
  });

  const adGroupsSchema = mongoose.model("adGroupsRouter", adGroupsRouter);


module.exports = adGroupsSchema;