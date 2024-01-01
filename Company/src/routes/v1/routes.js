import { Router } from 'express';



import { getCompanyInfo, createCompanyInfo } from '../../controllers/v1/companyController.js';

const companyRouter = Router();


companyRouter.get('/getcompany',async(req,res)=>{
    const { companyID } = req.body;
    const company = await getCompanyInfo(companyID);
    if(!company){
        res.status(500).send( {d: "Error while retrieving company details"} )
    }
    else {
       return res.status(201).send({d:company});
    }
    
})
companyRouter.post('/createCompany', async (req,res)=>{
     const data = await createCompanyInfo(req.body);
     if(data){
        res.status(201).send({data})
     }
     else{
        res.status(500).send({"Internal Server Error"})
     }
})



module.exports = companyRouter;