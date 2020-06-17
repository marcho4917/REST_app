const express = require('express');
const router = express.Router();
const db = require('../db');
const async = require('async');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/:id').get(async(req, res) => {

    function getID(e) {
        const searchedIdObject = e;
        const urlID = (req.params.id);
        if (searchedIdObject.id == urlID ) {
                return true;
            }
    };
    
    const seatData = await db.seats.find(getID);
    res.json(seatData);
});

router.route('/seats').post((req, res) => {
    const { day, seat, client, email } = req.body;
    const objectID = Math.floor((Math.random() * 100) + 1);

    const newSeat = new Seat({id: objectID, day: day, seat: seat, client: client, email: email  });
    db.seats.push(newSeat);
    res.json({message: 'OK'});
});

router.route('/seats/:id').put(async (req, res) => {
    const { day, seat, client, email } = req.body;

    function getIdObject(e) {
        const searchedObject = e;
        const urlid = (req.params.id);
        if (searchedObject.id == urlid ) {
                return true;
            }
    };
    
    const updatedObject = await db.seats.find(getIdObject);
    updatedObject.day = day;
    updatedObject.seat = seat;
    updatedObject.client = client;
    updatedObject.email = email;

    res.json({message: 'OK'});
});

router.route('/seats/:id').delete(async (req, res) => {

    function getIdObject(e) {
        const searchedObject = e;
        const urlid = (req.params.id);
        if (searchedObject.id == urlid ) {
                return true;
            }
    };
    
    const deleteObject = await db.seats.find(getIdObject);
    db.seats.splice(deleteObject);
    res.json({message: 'OK'});
});

module.exports = router;