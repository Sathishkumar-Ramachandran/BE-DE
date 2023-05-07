const express = require("express");
const UserSchemaStructure = require("../logics/mongoCollection");
const MongoRouter = express.Router();

MongoRouter.post("/addMongoSchema", async (req, res) => {
  const flag = await UserSchemaStructure.checkWithCompanyId(req.body.companyId);
  console.log(flag)
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

module.exports = MongoRouter;
