const express = require("express");
// const {
//     UserSchemaStructure,
//     UserCreation,
// } = require("../logics/adminUserSchema");
const adminuserRouter = express.Router();

adminuserRouter.post("/userschema/123456", async (req, res) => {
   
  const flag = await UserSchemaStructure.checkWithCompanyId(req.body.companyid);
  console.log(flag);
  if (flag === 1) {
    const d = await UserSchemaStructure.updateSchema(req.body);
    if (d == 1) {
      return res.sendStatus(201);
    } else {
      return res.sendStatus(500);
    }
  } else if (flag === 2) {
    const d = await UserSchemaStructure.addSchema(req.body);
    if (d == 1) {
      return res.sendStatus(201);
    } else {
      return res.sendStatus(500);
    }
  } else {
    return res.sendStatus(500);
  }
});
adminuserRouter.get("/getschema/:companyid/", async (req, res) => {
  const schema = await UserSchemaStructure.getSchema(req.params.companyid);
  if (schema) {
    res.json(schema.schema);
  } else {
    res.json([]);
  }
});

adminuserRouter.post("/createuser/:companyid", async (req, res) => {
  const schema = await UserSchemaStructure.getSchema(req.body.companyId);
  if (schema) {
    const d = await UserCreation.addUser(schema.mongo_schema, req.body.data,req.body.companyId);
    if (d) {
      res.send("success");
    } else {
      res.send("failed");
    }
  } else {
    res.send("failed");
  }
});

adminuserRouter.get("/getallusers/:companyid", async (req, res) => {
  const schema = await UserSchemaStructure.getSchema(req.params.companyid);
  if (schema) {
    const allusers=await UserCreation.getAllUser(schema.mongo_schema,req.params.companyid);
    res.json(allusers);

  } else {
    res.send("failed");
  }
});
module.exports = adminuserRouter;
