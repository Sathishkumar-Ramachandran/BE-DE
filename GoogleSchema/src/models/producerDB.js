const mongoose = require('mongoose');


const producerDB = mongoose.schema({
    companyId: {type: String, require: true},
    producerChannel: {type: String, require: true},
    channelComponent: {type: String, require: true},
    componentType: {type: String, require: true},
    details: {type: Array, require: true}
});

const producer = mongoose.model('prodcuer', producerDB);

module.export = producer;
