const CompanyInfo = require("../models/schema");

const CompanyService = {
  getCompanyInfo: async (email) => {
    const company = await CompanyInfo.findOne({ email: email });
    return company;
  },
  createCompanyInfo: async (params) => {
    try {
      const c = await CompanyInfo.create({
        name: params.name,
        email: params.email,
        companyName: params.companyName,
        user_id: params.user_id,
        verified: true,
        plan_id: 1,
      });
     
      return c
    } catch (e) {
        return undefined
    }
  },
};

module.exports = CompanyService;
