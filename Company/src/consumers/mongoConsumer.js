const CompanyInfo = require("../models/companyModel.js"); // Assuming you have a model defined
const connectDB = require("../config/mongoDBconnection.js");
const kafkaConfig = require("../config/MQConfig.js");



const consumer = new kafka.Consumer(
  kafkaConfig.client,
  [{ topic: 'company_creation', partition: 0 }],
  { autoCommit: true }
);


consumer.on('message', async function (message) {
  try {
    const companyData = JSON.parse(message.value);
    const c = await CompanyInfo.create({
      name: companyData.name,
      email: companyData.email,
      companyName: companyData.companyName,
      user_id: companyData.user_id,
      verified: true,
      plan_id: 1,
      dbName: companyData.dbName,
    });

    console.log(`Created company with ID: ${c._id}`);
  } catch (error) {
    console.error('Error creating company in MongoDB:', error);
  }
});

consumer.on('error', function (err) {
  console.log('Error:', err);
});
