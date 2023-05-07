const userSchema =require('../models/schema')
const mongoose = require('mongoose');

const UserSchemaStructure={
    addSchema:async(Obj)=>{
        try {

            let requestjson;
            Obj.schema.map((y) => {
                var name = y.Name
                requestjson = { ...requestjson, [name]: { type: y.type, require: y.required, default: y.default } }
            })
            const schema = await userSchema.create({
                schema: [requestjson],
                companyId: Obj.companyId,
    
            })
            console.log(schema)
            return 1;
        }
        catch (err) {
            return 0
            process.exit(1);
        }
    },
    checkWithCompanyId:async(id)=>{
        try {
            const schema = await userSchema.findOne({ companyId: id });
            if (schema) {
              return 1;
            } else {
              return 2;
            }
          } catch (err) {
            console.error(err);
            return 0;
          }

    },
    updateSchema:async(Obj)=>{
        try {
            let requestjson = {};
            Obj.schema.map((y) => {
              var name = y.Name
              requestjson = { ...requestjson, [name]: { type: y.type, required: y.required, default: y.default } }
            })
            const result = await userSchema.updateOne(
              { companyId: Obj.companyId },
              { schema: [requestjson] }
            );
            return 1
          } catch (err) {
            console.error(err);
            return 0;
          }
      

    },

    
}

module.exports=UserSchemaStructure;