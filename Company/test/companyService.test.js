const assert = require('chai').assert;
const CompanyService = require('../src/services/companyService');

describe('CompanyService', function() {
  describe('getCompanyInfo()', function() {
    it('should return a company object when valid email is provided', async function() {
      const company = await CompanyService.getCompanyInfo('test@example.com');
      assert.isObject(company);
      assert.property(company, 'name');
      assert.property(company, 'email');
      // Add more assertions as needed
    });

    it('should return null when invalid email is provided', async function() {
      const company = await CompanyService.getCompanyInfo('invalid@example.com');
      assert.isNull(company);
    });
  });

  describe('createCompanyInfo()', function() {
    it('should return a newly created company object', async function() {
      const params = {
        name: 'Test Company',
        email: 'test@test.com',
        companyName: 'TestCo',
        user_id: 123,
        dbName: 'testdb'
        // Add other required properties
      };
      const company = await CompanyService.createCompanyInfo(params);
      assert.isObject(company);
      assert.property(company, 'name');
      assert.property(company, 'email');
      // Add more assertions as needed
    });

    it('should return undefined when creation fails', async function() {
      const params = {
        // Incomplete or invalid params for creation
      };
      const company = await CompanyService.createCompanyInfo(params);
      assert.isUndefined(company);
    });
  });
});
