const express = require("express");
const {
    googleUserSchemaStructure,
    userCreation,
} = require("../logics/googleUserSchema");
const googleRouter = express.Router();

googleRouter.post("/addGoogleSchema", async (req, res) => {
   
  const flag = await googleUserSchemaStructure.checkWithCompanyId(req.body.companyId);
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
googleRouter.get("/getSchema/:companyid/", async (req, res) => {
  const schema = await googleUserSchemaStructure.getSchema(req.params.companyid);
  if (schema) {
    res.json(schema.schema);
  } else {
    res.json([]);
  }
});

googleRouter.post("/addUser", async (req, res) => {
  const schema = await googleUserSchemaStructure.getSchema(req.body.companyId);
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

googleRouter.get("/getAllUser/:companyid", async (req, res) => {
  const schema = await googleUserSchemaStructure.getSchema(req.params.companyid);
  if (schema) {
    const allusers=await userCreation.getAllUser(schema.mongo_schema,req.params.companyid);
    res.json(allusers);

  } else {
    res.send("failed");
  }
});
module.exports = googleRouter;
