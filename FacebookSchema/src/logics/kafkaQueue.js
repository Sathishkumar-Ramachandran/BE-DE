const { Kafka } = require("kafkajs");

class KafkaQueue {
  constructor() {
    this.kafka = new Kafka({
      clientId: "ad-producer",
      brokers: ["localhost:9092"], // Replace with your Kafka brokers
    });
    this.producer = this.kafka.producer();
  }

  async connect() {
    await this.producer.connect();
    console.log("Producer connected to Kafka");
  }

  async produceCampaign(campaign) {
    await this.producer.send({
      topic: "Facebook Campaign", // Replace with your Kafka topic name for campaigns
      messages: [{ value: JSON.stringify(campaign) }],
    });
  }

  async produceAd(ad) {
    await this.producer.send({
      topic: "Facebook Ad", // Replace with your Kafka topic name for ads
      messages: [{ value: JSON.stringify(ad) }],
    });
  }

  async produceAdset(adset) {
    await this.producer.send({
      topic: "Facebook Adset", // Replace with your Kafka topic name for adsets
      messages: [{ value: JSON.stringify(adset) }],
    });
  }
}

module.exports = KafkaQueue;
