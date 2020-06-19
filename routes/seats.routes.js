const express = require('express');
const router = express.Router();
const db = require('../db');

function getID(e) {
    const searchedIdObject = e;
    const urlID = (req.params.id);
    if (searchedIdObject.id == urlID ) {
            return true;
        }
};


router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/:id').get(async(req, res) => {
    const seatData = await db.seats.find(getID);
    res.json(seatData);
});

router.route('/seats').post((req, res) => {
    const { day, seat, client, email } = req.body;
    const objectID = Math.floor((Math.random() * 100) + 1);

    const newSeat = {id: objectID, day: day, seat: seat, client: client, email: email  };
    if(db.seats.some(e => e.seat === req.body.seat && e.day === req.body.day)){
        res.status(409).json({ message: "The slot is already taken..." });
    } else {
        db.seats.push(newSeat);
        res.json({message: 'OK'});
    }
});

router.route('/seats/:id').put(async (req, res) => {
    const { day, seat, client, email } = req.body;
    const updatedObject = await db.seats.find(getID);
    updatedObject.day = day;
    updatedObject.seat = seat;
    updatedObject.client = client;
    updatedObject.email = email;

    res.json({message: 'OK'});
});

router.route('/seats/:id').delete(async (req, res) => {
    const deleteObject = await db.seats.find(getID);
    db.seats.splice(deleteObject);
    res.json({message: 'OK'});
});

module.exports = router;