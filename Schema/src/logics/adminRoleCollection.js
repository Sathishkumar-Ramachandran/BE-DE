const roleSchema = require("../models/roleSchema");
const mongoose = require("mongoose");

const RoleSchemaStructure = {
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
      const schema = await roleSchema.create({
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
    const schema = await roleSchema.findOne({ companyId: company_id });
    return schema;
  },
  checkWithCompanyId: async (id) => {
    try {
      const schema = await roleSchema.findOne({ companyId: id });
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
      const result = await roleSchema.updateOne(
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
const roleCreation = {
  addRole: async (schema, data, id) => {
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
      const definemodel = mongoose.model("Roles", defineschema);
      const rolesinfo = await definemodel.create(final);
      return rolesinfo;
    } catch (e) {
      mongoose.deleteModel("Roles");
      const rolesinfo = await mongoose
        .model("Roles", defineschema)
        .create(final);
      return rolesinfo;
    }
  },
  getAllRoles: async (schema,id) => {
    try {
      const defineschema = new mongoose.Schema(schema);
      let rolesInfoModel;
      try {
        rolesInfoModel = mongoose.model("Roles");
      } catch (error) {
        rolesInfoModel = mongoose.model("Roles", defineschema);
      }

      const roles = await rolesInfoModel.find({companyId:id});
      return roles;
    } catch (error) {
      // Handle any errors that occur during the query
      console.error("Error retrieving users:", error);
      return [];
    }
  },
};

module.exports = { RoleSchemaStructure, roleCreation };
