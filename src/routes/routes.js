const express = require("express");
const userRouter = express.Router();
const UserSchemaCrud = require("../logics/SchemaCollection");

userRouter.post("saveUserSchema", async (req, res) => {
  const flag = await UserSchemaCrud.checkIsUserSchemaDefiend(
    req.body.companyId
  );
  if (flag) {
    const d = await UserSchemaCrud.UpdateSchema(
      req.body.companyId,
      req.body.schema
    );
    if (d == 1) {
      return res.status(201).send({ status: 1, msg: "UserSchema Updated" });
    } else {
      return res.status(201).send({ status: 0, msg: "Failed" });
    }
  } else {
    const d = await UserSchemaCrud.InsertSchema(req.body);
    if (d == 1) {
      return res.status(201).send({ status: 1, msg: "UserSchema Saved" });
    } else {
      return res.status(201).send({ status: 0, msg: "Failed" });
    }
  }
});

userRouter.post('deleteSchema',async(req,res)=>{
    const flag = await UserSchemaCrud.checkIsUserSchemaDefiend(
        req.body.companyId
      );
      if(flag){
           const d= await UserSchemaCrud.DeleteSchema(req.params.companyId);
           if(d==1){
            return res.status(201).send({status:1,msg:"Sucess"})
           }
           else{
            return res.status(201).send({status:0,msg:"Failed"})
           }
      }
      else{
        return res.status(201).send({status:0,msg:"There is No UserSchema Based On that company_id"})
      }
})

module.exports = userRouter;
