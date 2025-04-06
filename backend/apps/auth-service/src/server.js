// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const { connectProducer } = require('./kafka/producer');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('✅ Auth service is running');
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectProducer(); // ✅ connect Kafka producer before starting
  app.listen(PORT, () => {
    console.log(`🚀 Auth service is running on http://localhost:${PORT}`);
  });
};

startServer();
