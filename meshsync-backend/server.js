require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const Alert = require('./models/Alert');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://user:TVBmVksP70Me1q34@cluster0.hptixdp.mongodb.net/?appName=Cluster0")
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/api/alerts', async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/alerts', async (req, res) => {
  try {
    const { type, lat, lng, details } = req.body;
    const ticketId = `ECHO-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const newAlert = new Alert({ ticketId, type, lat, lng, details });
    const savedAlert = await newAlert.save();

    io.emit('new_alert', savedAlert);
    
    res.status(201).json(savedAlert);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save alert' });
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));