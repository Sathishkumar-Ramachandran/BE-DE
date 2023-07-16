const campaignSchema = require("../models/campaignSchema");
const mongoose = require("mongoose");
const kafka = require('kafka-node');
const {KafkaQueue } = require("./kafkaQueue.js")


const CampaignStructure = {
  addSchema: async (Obj) => {
    try {
      let requestjson;
      Obj.mongo_schema.map((y) => {
        var name = y.Name;
        requestjson = {
          ...requestjson,
          [name]: { type: y.type, require: y.required, default: y.default },
        };
      });
      requestjson={...requestjson,companyId:{type:"Number",required:true}}
      const schema = await campaignSchema.create({
        schema: Obj.schema,
        mongo_schema: [requestjson],
        companyId: Obj.companyId,
      });
      console.log(schema);
      return 1;
    } catch (err) {
      return 0;
      process.exit(1);
    }
  },
  getSchema: async (company_id) => {
    const schema = await campaignSchema.findOne({ companyId: company_id });
    return schema;
  },
  checkWithCompanyId: async (id) => {
    try {
      const schema = await campaignSchema.findOne({ companyId: id });
      if (schema) {
        return 1;
      } else {
        return 2;
      }
    } catch (err) {
      console.error(err);
      return 0;
    }
  },
  updateSchema: async (Obj) => {
    try {
      let requestjson = {};
      Obj.mongo_schema.map((y) => {
        var name = y.Name;
        requestjson = {
          ...requestjson,
          [name]: { type: y.type, required: y.required, default: y.default },
        };
      });
      requestjson={...requestjson,companyId:{type:"Number",required:true}}
      const result = await campaignSchema.updateOne(
        { companyId: Obj.companyId },
        { schema: Obj.schema, mongo_schema: [requestjson] }
      );
      return 1;
    } catch (err) {
      console.error(err);
      return 0;
    }
  },
};
const campaignCreation = {
  addCampaign: async (schema, data, id) => {
    const defineschema = new mongoose.Schema(schema);
    let keysArray = schema.map((obj) => Object.keys(obj));
    let flatKeysArray = [].concat(...keysArray);
    let final = [];
    console.log(flatKeysArray);
    console.log(schema);
    console.log(data);
    flatKeysArray.map((key, i) => {
      [data].map((v) => {
        if (key === Object.keys(v)[i]) {
          final = { ...final, [key]: v[key] };
        }
      });
    });


    final = { ...final, "companyId": id };
    console.log(final);
    try {
      const definemodel = mongoose.model("Campaigns", defineschema);
      
      const campaignInfo = await definemodel.create(final);
      return campaignInfo;
    } catch (e) {
      mongoose.deleteModel("Campaigns");
      const campaignInfo = await mongoose
        .model("Campaigns", defineschema)
        .create(final);
        await KafkaQueue.produceCampaign(campaignInfo)
      return campaignInfo;
    }
  },  
  getAllCampaigns: async (schema,id) => {
    try {
      const campaignSchema = new mongoose.Schema(schema);
      let campaignInfoModel;
      try {
        campaignInfoModel = mongoose.model("campaigns");
      } catch (error) {
        campaignInfoModel = mongoose.model("campaigns", campaignSchema);
        console.log("Error Occured");
      }

      const Campaigns = await campaignInfoModel.find({companyId:id});
      return Campaigns;
    } catch (error) {
      // Handle any errors that occur during the query
      console.error("Error retrieving users:", error);
      return [];
    }
  },
  
};

module.exports = { CampaignStructure, campaignCreation, KafkaQueue };
