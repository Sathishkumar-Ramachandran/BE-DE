const MediaSetupSchema = require("../models/mediasetupSchema");
const rolesRouter = require("../routes/roleRoutes");

const getDataByCompanyById = async (id) => {
  const schema = await MediaSetupSchema.findOne({ companyId: id });
  return schema;
};
const saveData = async (data) => {
  try {
    const filter = { companyId: data.companyId };
    const update = {
      app_secret: data.client_secret,
      app_id: data.client_id,
      developer_token: data.developer_token,
      companyId: data.companyId,
      refresh_token: "empty",
    };
    const options = { upsert: true, new: true };

    const existingData = await MediaSetupSchema.findOne(filter);

    if (existingData) {
      // Document with companyId exists, update it
      const updatedSchema = await MediaSetupSchema.findOneAndUpdate(
        filter,
        update,
        options
      );
      return 1;
    } else {
      // Document with companyId doesn't exist, insert new document
      const newSchema = await MediaSetupSchema.create(update);
      return 1;
    }
  } catch (e) {
    return 0;
  }
};

const updateData = async (refresh_token, companyId) => {
  console.log(refresh_token);
  console.log(companyId);
  try {
    const result = await MediaSetupSchema.updateOne(
      { companyId: companyId },
      { $set: { refresh_token: refresh_token } }
    );

    return 1;
  } catch (e) {
    console.log(e);
    return 0;
  }
};

module.exports = { getDataByCompanyById, saveData, updateData };
