const express = require("express");
const {
  AdsetStructure,
  adsetCreation,
} = require("../logics/adsetSchema.js");
const adsRouter = express.Router();

adsRouter.post("/adsetschema/123456", async (req, res) => {
  const flag = await AdsetStructure.checkWithCompanyId(req.body.companyId);
  console.log(flag);
  if (flag === 1) {
    const d = await AdsetStructure.updateSchema(req.body);
    if (d == 1) {
      return res.sendStatus(201);
    } else {
      return res.sendStatus(500);
    }
  } else if (flag === 2) {
    const d = await AdsetStructure.addSchema(req.body);
    if (d == 1) {
      return res.sendStatus(201);
    } else {
      return res.sendStatus(500);
    }
  } else {
    return res.sendStatus(500);
  }
});

adsRouter.get("/getschema/:companyid/", async (req, res) => {
  const schema = await AdsetStructure.getSchema(req.params.companyid);
  if (schema) {
    res.json(schema.schema);
  } else {
    res.json([]);
  }
});

adsRouter.post("/createad/:companyid/", async (req, res) => {
  const schema = await AdsetStructure.getSchema(req.body.companyId);
  if (schema) {
    const d = await adsetCreation.createAd(schema.mongo_schema, req.body.data,req.body.companyId);
    if (d) {
      res.send("sucess");
    } else {
      res.send("failed");
    }
  } else {
    res.send("failed");
  }
});

adsRouter.get("/allads/:companyid", async (req, res) => {
  const schema = await AdsetStructure.getSchema(req.params.companyid);
  if (schema) {
    const allads = await adsetCreation.getAllAds(schema.mongo_schema,req.params.companyid);
    res.json(allads);
  } else {
    res.send("failed");
  }
});
module.exports = adsRouter;
