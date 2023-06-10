const express = require("express");
const {
  RoleSchemaStructure,
  roleCreation,
} = require("../logics/adminRoleCollection");
const roleRouter = express.Router();

roleRouter.post("/roleschema/:companyId/", async (req, res) => {
  const flag = await RoleSchemaStructure.checkWithCompanyId(req.body.companyId);
  console.log(flag);
  if (flag === 1) {
    const d = await RoleSchemaStructure.updateSchema(req.body);
    if (d == 1) {
      return res.sendStatus(201);
    } else {
      return res.sendStatus(500);
    }
  } else if (flag === 2) {
    const d = await RoleSchemaStructure.addSchema(req.body);
    if (d == 1) {
      return res.sendStatus(201);
    } else {
      return res.sendStatus(500);
    }
  } else {
    return res.sendStatus(500);
  }
});

roleRouter.get("/roles/getschema/:companyid/", async (req, res) => {
  const schema = await RoleSchemaStructure.getSchema(req.params.companyid);
  if (schema) {
    res.json(schema.schema);
  } else {
    res.json([]);
  }
});

roleRouter.post("/roles/createrole/:companyid/", async (req, res) => {
  const schema = await RoleSchemaStructure.getSchema(req.body.companyId);
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

roleRouter.get("/getallroles/:companyid/", async (req, res) => {
  const schema = await RoleSchemaStructure.getSchema(req.params.companyid);
  if (schema) {
    const getAllRoles = await roleCreation.getAllRoles(schema.mongo_schema,req.params.companyid);
    res.json(getAllRoles);

  } else {
    res.send("failed");
  }
});
module.exports = roleRouter;
