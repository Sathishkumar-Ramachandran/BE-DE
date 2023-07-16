const express = require("express");
const {
    googleUserSchemaStructure,
    googleUserCreation,
} = require("../logics/facebookUserSchema");
const userRouter = express.Router();

userRouter.post("/userschema/123456", async (req, res) => {
   
  const flag = await googleUserSchemaStructure.checkWithCompanyId(req.body.companyid);
  console.log(flag);
  if (flag === 1) {
    const d = await googleUserSchemaStructure.updateSchema(req.body);
    if (d == 1) {
      return res.sendStatus(201);
    } else {
      return res.sendStatus(500);
    }
  } else if (flag === 2) {
    const d = await googleUserSchemaStructure.addSchema(req.body);
    if (d == 1) {
      return res.sendStatus(201);
    } else {
      return res.sendStatus(500);
    }
  } else {
    return res.sendStatus(500);
  }
});
userRouter.get("/getschema/:companyid/", async (req, res) => {
  const schema = await googleUserSchemaStructure.getSchema(req.params.companyid);
  if (schema) {
    res.json(schema.schema);
  } else {
    res.json([]);
  }
});

userRouter.post("/createuser/:companyid", async (req, res) => {
  const schema = await googleUserSchemaStructure.getSchema(req.body.companyId);
  if (schema) {
    const d = await googleUserCreation.addUser(schema.mongo_schema, req.body.data,req.body.companyId);
    if (d) {
      res.send("success");
    } else {
      res.send("failed");
    }
  } else {
    res.send("failed");
  }
});

userRouter.get("/getallusers/:companyid", async (req, res) => {
  const schema = await googleUserSchemaStructure.getSchema(req.params.companyid);
  if (schema) {
    const allusers=await googleUserCreation.getAllUser(schema.mongo_schema,req.params.companyid);
    res.json(allusers);

  } else {
    res.send("failed");
  }
});
module.exports = userRouter;
