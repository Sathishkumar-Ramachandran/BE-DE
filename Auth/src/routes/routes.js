const express = require("express");
const authRouter = express.Router();
const { AuthService, UserVerification } = require("../logics/authServices");
const axios=require('axios');
authRouter.post("/validEmail", async (req, res) => {
  const data = await AuthService.findUserByMail(req.params.email);
  if (data) {
    res.send({ d: 1 });
  } else {
    res.send({ d: 0 });
  }
});


authRouter.post('/checkCompanyName',async(req,res)=>{
    const data=await AuthService.findUserByCompany(req.params.companyName);
    if(data){
        res.send({d:1})
    }
    else{
        res.send({d:0});
    }
})

authRouter.post("/sendOTP", async (req, res) => {
  console.log(req.body);
  const data = await UserVerification.sendOtpToUser(req.body.email);
  if (data) {
    res.send({ d: 1 });
  } else {
    res.send({ d: 0 });
  }
});

authRouter.post("/verifyOTP", async (req, res) => {
  const data = await UserVerification.verifyOTP(req.body.email, req.body.otp);
  if (data) {
    if (data === 1) {
      res.send({ d: 1 });
    } else if (data === 0) {
      res.send({ d: 2 });
    } else {
      res.send({ d: 0 });
    }
  } else {
    res.send({ d: 0 });
  }
});

authRouter.post('/register',async(req,res)=>{
  
    if(!req.body.name){
        res.send({d:'Missing Required Parameter "name"'})
    }
    if(!req.body.email){
        res.send({d:'Missing Required Parameter "email"'})
    }
    if(!req.body.password){
        res.send({d:'Missing Required Parameter "password"'})
    }
    if(!req.body.companyName){
        res.send({d:'Missing Required Parameter "companyName"'})
    }
    if(!req.body.user_id){
        res.send({d:'Missing Required Parameter "user_id"'})
    }
    if(!req.body.user_type){
      res.send({d:'Missing Required Parameter "user_type"'})
  }
    
    // if(req.body.name &&req.body.email &&req.body.password &&req.body.companyName &&req.body.user_id&&(req.body.user_type?true:false)){
       const data= await AuthService.registerNewAuthUser(req.body);
      if(data){
         const d=await axios.post(process.env+'api/company/createCompany',req.body);
         if(d.data){
          res.status(201).send({d:d.data})
         }
         else{
          res.status(201).send({d:0})
         }
     }
    else{
     res.status(201).send({d:0})
    }
})
authRouter.post('/login',async(req,res)=>{
  const authUser=await AuthService.findUserByMail(req.body.email);
  if(authUser){
    const match = await bcrypt.compare(req.body.password, authUser.password);
    if (match) {
      const payload = { userMail:authUser.email,user_id:authUser.user_id,user_type:authUser.user_type };
      const secret = "Double#Engine@456";
      const options = { expiresIn: "1h" };
      const token = jwt.sign(payload, secret, options);
      res.status(201).send({ token });
    } else {
      return res.send({d:0});
    }
  }
  else{
    res.send({d:0})
  }
})


module.exports = authRouter;
