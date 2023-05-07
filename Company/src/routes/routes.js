const express =require('express');
const companyRouter=express.Router();
const CompanyService=require('../logics/companyService');


companyRouter.get('/:email',async(req,res)=>{
    const c = await CompanyService.getCompanyInfo(req.params.email);
    if(c){
        res.status(201).send({d:c})
    }
    else{
        res.status(201).send({d:0})
    }
    
})
companyRouter.post('/createCompany',async(req,res)=>{
     const data=await CompanyService.createCompanyInfo(req.body);
     if(data){
    
        res.status(201).send({data})
     }
     else{
        
        res.send(201).send({d:0})
     }
})
companyRouter.post('/checkingapi',async(req,res)=>{
     
       data={}

        res.status(201).send({data})
     
})




module.exports=companyRouter;