const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAllConcerts);
router.get('/concerts/:id', ConcertController.getConcertById);
router.get('/concerts/performer/:performer', ConcertController.getAllConcertsByPerformer);
router.get('/concerts/genre/:genre', ConcertController.getConcertsByGenre);
router.get('/concerts/price/:price_min/:price_max', ConcertController.getConcertsByPrice);
router.get('/concerts/day/:day', ConcertController.getConcertsByDay);
router.post('/concerts', ConcertController.addConcert);
router.put('/concerts/:id', ConcertController.updateConcert);
router.delete('/concerts/:id', ConcertController.deleteConcert);

module.exports = router;