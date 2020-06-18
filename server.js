const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  });

  // Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
});