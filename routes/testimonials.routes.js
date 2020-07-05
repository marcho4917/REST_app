const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonials.controller');

router.get('/testimonials/random', TestimonialController.getRandomTestimonial);
router.get('/testimonials', TestimonialController.getAllTestimonials);
router.get('/concerts/:id', TestimonialController.getTestimonialById);
router.post('/concerts', TestimonialController.addTestimonial);
router.put('/concerts/:id', TestimonialController.updateTestimonial);
router.delete('/concerts/:id', TestimonialController.deleteTestimonial);

module.exports = router;