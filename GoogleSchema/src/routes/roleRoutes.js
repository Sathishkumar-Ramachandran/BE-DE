const express = require("express");

const { rolesStructure, roleCreation } = require('../logics/rolesSchema.js')



const rolesRouter = express.Router();

rolesRouter.post("/roles", async (req, res) => {
  const flag = await rolesStructure.checkWithCompanyId(req.body.companyId);
  console.log(flag);
  if (flag === 1) {
    const d = await rolesStructure.updateSchema(req.body);
    if (d == 1) {
      return res.sendStatus(201);
    } else {
      return res.sendStatus(500);
    }
  } else if (flag === 2) {
    const d = await rolesStructure.addSchema(req.body);
    if (d == 1) {
      return res.sendStatus(201);
    } else {
      return res.sendStatus(500);
    }
  } else {
    return res.sendStatus(500);
  }
});

rolesRouter.get("/getSchema/:companyid/", async (req, res) => {
  const schema = await rolesStructure.getSchema(req.params.companyid);
  if (schema) {
    res.json(schema.schema);
  } else {
    res.json([]);
  }
});

rolesRouter.post("/createrole/:companyid/", async (req, res) => {
  const schema = await rolesStructure.getSchema(req.body.companyId);
  if (schema) {
    const d = await roleCreation.addRole(schema.mongo_schema, req.body.data,req.body.companyId);
    if (d) {
      res.send("sucess");
    } else {
      res.send("failed");
    }
  } else {
    res.send("failed");
  }
});

rolesRouter.get("/allroles/:companyid", async (req, res) => {
  const schema = await rolesStructure.getSchema(req.params.companyid);
  if (schema) {
    const allRoles = await roleCreation.getAllRoles(schema.mongo_schema,req.params.companyid);
    res.json(allRoles);
  } else {
    res.send("failed");
  }
});



module.exports = rolesRouter;
