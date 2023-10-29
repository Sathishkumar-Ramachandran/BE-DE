const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: process.env.kafka_CliendId,
  brokers: process.env.kafka_brokers
});

const messageProducer = kafka.producer();
            
const producer = {

    kafkaConnect : async(res) => {
        try {
            await messageProducer.connect();
            res.sendStatus(200);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    },

    producerMessage : async (message, res) => {
        try {
            await producer.kafkaConnect(res);

            if (res.statusCode == 200) {
                await producer.send({
                    topic: 'test-topic',
                    messages: [
                      { value: message }
                    ],
                  });
                  await producer.disconnect();
                }
            else {
                res,send(`Something went wrong!`)
            }
            }
        
        catch (err){
            res.status(500).send(err.message);
        }
    }

}

module.exports = producer;