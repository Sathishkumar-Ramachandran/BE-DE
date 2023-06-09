const express = require("express");
const {
  UserSchemaStructure,
  userCreation,
} = require("../logics/adminUserCollection");
const adminRouter = express.Router();

adminRouter.post("/userschema/123456", async (req, res) => {
  const flag = await UserSchemaStructure.checkWithCompanyId(req.body.companyId);
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

adminRouter.get("/getSchema/:companyid/", async (req, res) => {
  const schema = await UserSchemaStructure.getSchema(req.params.companyid);
  if (schema) {
    res.json(schema.schema);
  } else {
    res.json([]);
  }
});

adminRouter.post("/createuser/:companyid", async (req, res) => {
  const schema = await UserSchemaStructure.getSchema(req.body.companyId);
  if (schema) {
    const d = await userCreation.addUser(schema.mongo_schema, req.body.data,req.body.companyId);
    if (d) {
      res.send("sucess");
    } else {
      res.send("failed");
    }
  } else {
    res.send("failed");
  }
});

adminRouter.get("/getallusers/:companyid", async (req, res) => {
  const schema = await UserSchemaStructure.getSchema(req.params.companyid);
  if (schema) {
    const allusers=await userCreation.getAllUser(schema.mongo_schema,req.params.companyid);
    res.json(allusers);

  } else {
    res.send("failed");
  }
});
module.exports = adminRouter;
