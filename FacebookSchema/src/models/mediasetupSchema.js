const mongoose = require("mongoose");


const mediaSetupSchemaStrcuture = mongoose.Schema({
    app_id:{ type: String, require: true },
    app_secret:{ type: String, require: true },
    refresh_token:{ type: String, require: false },
    developer_token:{ type: String, require: true },
    companyId: { type: String, require: true },
  });

  const MediaSetupSchema = mongoose.model("mediaSetupSchemaStrcuture", mediaSetupSchemaStrcuture);


module.exports = MediaSetupSchema;