const Seat = require('../models/seat.model');

exports.getAllSeats = async (req,res) => {
    try {
        res.json (await Seat.find());
    } catch(err) {
        res.status(500).json({message: err});
    }
};

exports.getSeatById = async (req,res) => {
    try {
        const seat = await Seat.findById(req.params.id);
        if(!seat) res.status(404).json({message: 'Not found!'});
        else res.json(seat);
    } catch(err) {
        res.status(500).json({message: err});
    }
};

exports.addSeat = async (req,res) => {
    try {
        const { day, seat, client, email } = req.body;
        const newSeat = new Seat({day: day, seat: seat, client: client, email: email});
        await newSeat.save();
        res.json({message:'OK'});
    } catch(err) {
        res.status(500).json({message: err});
    }
};

exports.updateSeat = async (req,res) => {
    const { day, seat, client, email } = req.body;

    try {
        const seat = await Seat.findById(req.params.id);
        if(seat) {
            await Seat.updateOne({_id: req.params.id}, {$set: {day: day, seat: seat, client:client, email: email}});
            res.json({message: 'OK'});
        } else res.stauts(404).json({message: 'Not found'});
    } catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.deleteSeat = async (req,res) => {
    try {
        const seat = await Seat.findById(req.params.id);
        if(seat) {
          await Seat.deleteOne({_id: req.params.id});
          res.json({message: 'OK'});
        } else res.status(404).json({message: 'Not found...'});
      } catch(err) {
        res.status(500).json({message: err});
      }
};