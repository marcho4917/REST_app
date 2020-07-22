const Concert = require('../models/concert.model');
const sanitize = require('mongo-sanitize');

exports.getAllConcerts = async (req,res) => {
    try {
        res.json (await Concert.find());
    } catch(err) {
        res.status(500).json({message: err});
    }
};

exports.getConcertById = async (req,res) => {
    try {
        const concert = await Concert.findById(req.params.id);
        if(!concert) res.status(404).json({message: 'Not found!'});
        else res.json(concert);
    } catch(err) {
        res.status(500).json({message: err});
    }
};

exports.getAllConcertsByPerformer = async (req,res) => {
    try {
        const performerConcerts = await Concert.find({performer: req.params.performer});
        if(!performerConcerts) res.status(404).json({message: 'Not found!'});
        else res.json(performerConcerts);
    } catch(err) {
        res.status(500).json({message: err});
    }
};

exports.getConcertsByGenre = async (req,res) => {
    try {
        const genreConcerts = await Concert.find({genre: req.params.genre});
        if(!genreConcerts) res.status(404).json({message: 'Not found!'});
        else res.json(genreConcerts);
    } catch(err) {
        res.status(500).json({message: err});
    }
};

exports.getConcertsByPrice = async (req,res) => {
    try {
        const priceRange = await Concert.find({price: { $gt: req.params.price_min, $lt: req.params.price_max}});
        if(!priceRange) res.status(404).json({message: 'Not found!'});
        else res.json(priceRange);
    } catch(err) {
        res.status(500).json({message: err});
    }
};

exports.getConcertsByDay = async (req,res) => {
    try {
        const concertsByDay = await Concert.find({day: req.params.day});
        if(!concertsByDay) res.status(404).json({message: 'Not found!'});
        else res.json(concertsByDay);
    } catch(err) {
        res.status(500).json({message: err});
    }
};

exports.addConcert = async (req,res) => {
    try {
        const clean = sanitize(req.body);
        const { performer, genre, price, day, image } = clean;
        const newConcert = new Concert({performer: performer, genre: genre, price: price, day: day, image: image});
        await newConcert.save();
        res.json({message:'OK'});
    } catch(err) {
        res.status(500).json({message: err});
    }
};

exports.updateConcert = async (req,res) => {
    const { performer, genre, price, day, image } = req.body;

    try {
        const concert = await Concert.findById(req.params.id);
        if(concert) {
            await Concert.updateOne({_id: req.params.id}, {$set: {performer: performer, genre: genre, price: price, day: day, image: image }});
            res.json({message: 'OK'});
        } else res.stauts(404).json({message: 'Not found'});
    } catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.deleteConcert = async (req,res) => {
    try {
        const concert = await Concert.findById(req.params.id);
        if(concert) {
          await Concert.deleteOne({_id: req.params.id});
          res.json({message: 'OK'});
        } else res.status(404).json({message: 'Not found...'});
      } catch(err) {
        res.status(500).json({message: err});
      }
};