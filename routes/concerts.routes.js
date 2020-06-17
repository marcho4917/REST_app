const express = require('express');
const router = express.Router();
const db = require('../db');
const async = require('async');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/:id').get(async(req, res) => {

    function getID(e) {
        const searchedIdObject = e;
        const urlID = (req.params.id);
        if (searchedIdObject.id == urlID ) {
                return true;
            }
    };
    
    const concertData = await db.concerts.find(getID);
    res.json(concertData);
});

router.route('/concerts').post((req, res) => {
    const { performer, genre, price, day, image } = req.body;
    const objectID = Math.floor((Math.random() * 100) + 1);

    const newConcert = new Concert({id: objectID, performer: performer, genre: genre, price: price, day: day, image: image});
    db.concerts.push(newConcert);
    res.json({message: 'OK'});
});

router.route('/concerts/:id').put(async (req, res) => {
    const { performer, genre, price, day, image } = req.body;

    function getIdObject(e) {
        const searchedObject = e;
        const urlid = (req.params.id);
        if (searchedObject.id == urlid ) {
                return true;
            }
    };
    
    const updatedObject = await db.concerts.find(getIdObject);
    updatedObject.performer = performer;
    updatedObject.genre = genre;
    updatedObject.price = price;
    updatedObject.day = day;
    updatedObject.image = image;

    res.json({message: 'OK'});
});

router.route('/concerts/:id').delete(async (req, res) => {

    function getIdObject(e) {
        const searchedObject = e;
        const urlid = (req.params.id);
        if (searchedObject.id == urlid ) {
                return true;
            }
    };
    
    const deleteObject = await db.concerts.find(getIdObject);
    db.concerts.splice(deleteObject);
    res.json({message: 'OK'});
});

module.exports = router;