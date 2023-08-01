const express = require('express');
const mediasetup = express.Router();
const {
    getDataByCompanyById,
    saveData,
    updateData,
  } = require("../logics/MediaSetupLogics");



mediasetup.post("/saveGoogleData", async (req, res) => {
    const data = await saveData(req.body);
    if (data === 0) {
      res.send({ status: "0", message: "failed" });
    } else if (data === 1) {
      res.send({ status: "1", message: "sucess" });
    }
  });
  
mediasetup.get("/getDataById/:CompanyId/", async (req, res) => {
    const data = await getDataByCompanyById(req.params.CompanyId);
    res.send(data);
  });
  
mediasetup.post("/updateRefreshToken",async(req,res)=>{
      const data = await updateData(req.body.token,req.body.companyId);
      if (data === 0) {
        res.send({ status: "0", message: "failed" });
      } else if (data === 1) {
        res.send({ status: "1", message: "sucess" });
      }
  })
  
module.exports = mediasetup;
  