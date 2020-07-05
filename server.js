const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const mongoClient = require('mongodb').MongoClient;


mongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err){
    console.log(err);
  }
  else {
    console.log('Successfully connected to the database');
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use('/api', testimonialsRoutes);
    app.use('/api', concertsRoutes);
    app.use('/api', seatsRoutes);

    app.use((req, res) => {
      res.status(404).json({ message: 'Not found...' });
    });

    const server = app.listen(process.env.PORT || 8000, () => {
      console.log('Server is running on port: 8000');
    });

    const messages = [];

    const io = socket(server);

    app.use((req, res, next) => {
      req.io = io;
      next();
    });

      // Serve static files from the React app
    app.use(express.static(path.join(__dirname, '/client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '/client/build/index.html'));
      });
      
    io.on('connection', (socket) => {
      console.log('New socket!');
    });

  }
});



