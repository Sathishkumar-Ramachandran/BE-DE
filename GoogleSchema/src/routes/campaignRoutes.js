const express = require("express");
const {
  CampaignStructure,
  campaignCreation,
  KafkaQueue,
} = require("../logics/CampaignSchema.js");
const campaignRouter = express.Router();

campaignRouter.post("/campaignschema/123456", async (req, res) => {
  const flag = await CampaignStructure.checkWithCompanyId(req.body.companyId);
  console.log(flag);
  if (flag === 1) {
    const d = await CampaignStructure.updateSchema(req.body);
    if (d == 1) {
      return res.sendStatus(201);
    } else {
      return res.sendStatus(500);
    }
  } else if (flag === 2) {
    const d = await CampaignStructure.addSchema(req.body);
    if (d == 1) {
      return res.sendStatus(201);
    } else {
      return res.sendStatus(500);
    }
  } else {
    return res.sendStatus(500);
  }
});

campaignRouter.get("/getschema/:companyid/", async (req, res) => {
  const schema = await CampaignStructure.getSchema(req.params.companyid);
  if (schema) {
    res.json(schema.schema);
  } else {
    res.json([]);
  }
});

campaignRouter.post("/createcampaign/:companyid/", async (req, res) => {
  const schema = await CampaignStructure.getSchema(req.body.companyId);
  if (schema) {
    const d = await campaignCreation.addCampaign(schema.mongo_schema, req.body.data,req.body.companyId);
    if (d) {
      res.send("sucess");
    } else {
      res.send("failed");
    }
  } else {
    res.send("failed");
  }
});

campaignRouter.get("/allcampaigns/:companyid", async (req, res) => {
  const schema = await CampaignStructure.getSchema(req.params.companyid);
  if (schema) {
    const allcampaigns = await campaignCreation.getAllCampaigns(schema.mongo_schema,req.params.companyid);
    res.json(allcampaigns);
  } else {
    res.send("failed");
  }
});

campaignRouter.post("/sendkafka",async(req,res)=>{
   const queue=KafkaQueue.sendCampaigntoPy();
   res.send(queue)

})
module.exports = campaignRouter;
