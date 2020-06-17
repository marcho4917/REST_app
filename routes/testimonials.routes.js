const express = require('express');
const router = express.Router();
const db = require('../db');
const async = require('async');


router.route('/testimonials/random').get((req, res) => {
    const randomObject = db.testimonials[Math.floor(Math.random() * db.testimonials.length - 1)];
    res.json(randomObject);
});

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

router.route('/testimonials/:id').get(async(req, res) => {

    function getID(e) {
        const searchedIdObject = e;
        const urlID = (req.params.id);
        if (searchedIdObject.id == urlID ) {
                return true;
            }
    };
    
    const authorData = await db.testimonials.find(getID);
    res.json(authorData);
});

router.route('/testimonials').post((req, res) => {
    const {author, text} = req.body;
    const objectID = Math.floor((Math.random() * 100) + 1);

    const newArtist = new Artist({id: objectID, author: author, text: text});
    db.testimonials.push(newArtist);
    res.json({message: 'OK'});
});

router.route('/testimonials/:id').put(async (req, res) => {
    const {author, text} = req.body;

    function getIdObject(e) {
        const searchedObject = e;
        const urlid = (req.params.id);
        if (searchedObject.id == urlid ) {
                return true;
            }
    };
    
    const updatedObject = await db.testimonials.find(getIdObject);
    updatedObject.author = author;
    updatedObject.text = text;

    res.json({message: 'OK'});
});

router.route('/testimonials/:id').delete(async (req, res) => {

    function getIdObject(e) {
        const searchedObject = e;
        const urlid = (req.params.id);
        if (searchedObject.id == urlid ) {
                return true;
            }
    };
    
    const deleteObject = await db.testimonials.find(getIdObject);
    db.testimonials.splice(deleteObject);
    res.json({message: 'OK'});
});

module.exports = router;