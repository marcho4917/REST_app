const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

module.exports = server;

io.on('connection', (socket) => {
  console.log('New socket!');
});

mongoose.connect('mongodb://localhost:27017/NewWaveDB', { useNewUrlParser: true, useUnifiedTopology: true  });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error ' + err));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});