// src/kafka/producer.js
const { Kafka } = require('kafkajs');
const fs = require('fs');
require('dotenv').config();

const kafka = new Kafka({
  clientId: 'auth-service',
  brokers: [process.env.KAFKA_BROKER],
  ssl: {
    rejectUnauthorized: true,
    key: fs.readFileSync(process.env.KAFKA_CLIENT_KEY_PATH),
    cert: fs.readFileSync(process.env.KAFKA_CLIENT_CERT_PATH),
    ca: [fs.readFileSync(process.env.KAFKA_CA_PATH)],
  },
});

const producer = kafka.producer();

const connectProducer = async () => {
  try {
    await producer.connect();
    console.log('✅ Kafka Producer Connected');
  } catch (err) {
    console.error('❌ Kafka Producer Connection Failed', err);
  }
};

const publishUserCreated = async (userData) => {
  try {
    await producer.send({
      topic: 'user-created',
      messages: [{ value: JSON.stringify(userData) }],
    });
    console.log('📤 User created event published');
  } catch (err) {
    console.error('❌ Error publishing user-created event', err);
  }
};

module.exports = {
  connectProducer,
  publishUserCreated
};
