import { CompanyInfo } from '../../models/v1/companyModels.js';


const CompanyService = {

  getCompanyInfo: async (companyID) => {
    const company = await CompanyInfo.findOne( { Company: companyID } );
    if (company) {
      return company;
    }
    else {
      throw new Error(`No information found for the company with ID ${companyID}`);
      return res.status(500)
    }
    
  },

  createCompanyInfo: async (params) => {

    try {

      const companyDetails = await CompanyInfo.create({
        name: params.name,
        email: params.email,
        companyName: params.companyName,
        user_id: params.user_id,
        verified: true,
        plan_id: 1,
        dbName
      });
     
      return c
    } catch (e) {
        return undefined
    }
  },
};

module.exports = CompanyService;
