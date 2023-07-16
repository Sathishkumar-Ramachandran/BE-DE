const adsSchema = require("../models/AdsSchemaModel.js");
const mongoose = require("mongoose");
const { KafkaQueue } = require("./kafkaQueue.js")
const AdsStructure = {
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
      const schema = await adsSchema.create({
        schema: Obj.schema,
        mongo_schema: [requestjson],
        status: "In-Progress",
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
    const schema = await adsSchema.findOne({ companyId: company_id });
    return schema;
  },
  checkWithCompanyId: async (id) => {
    try {
      const schema = await adsSchema.findOne({ companyId: id });
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
      const result = await adsSchema.updateOne(
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
const adsCreation = {
  createAd: async (schema, data, id) => {
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
      const definemodel = mongoose.model("Facebook Ads", defineschema);
      const adsInfo = await definemodel.create(final);
      return adsInfo;
    } catch (e) {
      mongoose.deleteModel("Facebook Ads");
      const adsInfo = await mongoose
        .model("Ads", defineschema)
        .create(final);
        await KafkaQueue.produceAd(adsInfo)
      return adsInfo;
    }
  },  
  getAllAds: async (schema,id) => {
    try {
      const adsSchema = new mongoose.Schema(schema);
      let adsInfoModel;
      try {
        adsInfoModel = mongoose.model("Facebook Ads");
      } catch (error) {
        adsInfoModel = mongoose.model("Facebook Ads", adsSchema);
        console.log("Error Occured");
      }

      const Ads = await adsInfoModel.find({companyId:id});
      return Ads;
    } catch (error) {
      // Handle any errors that occur during the query
      console.error("Error retrieving Ads:", error);
      return [];
    }
  },
};

module.exports = { AdsStructure, adsCreation };
