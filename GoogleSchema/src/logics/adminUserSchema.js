const UserSchema = require("../models/userSchemaAdmin");
const mongoose = require("mongoose");

const UserSchemaStructure = {
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
      const schema = await UserSchema.create({
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
    const userschema = await UserSchema.findOne({ companyId: company_id });
    return userschema;
  },
  checkWithCompanyId: async (id) => {
    try {
      const schema = await UserSchema.findOne({ companyId: id });
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
      const result = await UserSchema.updateOne(
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
const UserCreation = {
  addUser: async (schema, data, id) => {
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
      const definemodel = mongoose.model("Users", defineschema);
      const userinfo = await definemodel.create(final);
      return userinfo;
    } catch (e) {
      mongoose.deleteModel("Users");
      const userinfo = await mongoose
        .model("Google Users", defineschema)
        .create(final);
      return userinfo;
    }
  },
  getAllUser: async (schema,id) => {
    try {
      const userSchema = new mongoose.Schema(schema);
      let UserInfoModel;
      try {
        UserInfoModel = mongoose.model("Users");
      } catch (error) {
        UserInfoModel = mongoose.model("Users", userSchema);
      }

      const users = await UserInfoModel.find({companyId:id});
      return users;
    } catch (error) {
      // Handle any errors that occur during the query
      console.error("Error retrieving users:", error);
      return [];
    }
  },
};

module.exports = { UserSchemaStructure, UserCreation };
