const express = require('express');
const app = express();
const cors = require('cors');

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.listen(8000, () => {
    console.log('Seerver is running on port: 8000');
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
});