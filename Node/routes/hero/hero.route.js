'use strict';
const express = require('express');
const router = express.Router();
const Hero = require('../../models/hero.model');


router.get('/', function (req, res, next) {
    Hero.find(function (err, heros) {
        if (err) return next(err);
        return res.json(heros);
    });
});

router.get('/search', function (req, res, next) {

    var searchParams = {};
    if (req.query.name) {
        const name = req.query.name;
        searchParams = Object.assign(searchParams, { name: { $regex: name, $options: "i" } });
    }

    if (req.query.id) {
        const id = req.query.id;
        searchParams = Object.assign(searchParams, { id: id });
    }

    if (searchParams === {}) return res.status(403).json('Hero name or id must be specified');

    Hero.find(searchParams, function (err, heros) {
        if (err) return next(err);
        return res.json(heros);
    });
});

router.post('/', function (req, res, next) {
    Hero.findOneAndUpdate(
        { 'name': req.body.name },
        req.body,
        { upsert: true, new: true },
        function (err, data) {
            if (err) {
                return res.send(err);
            } else {
                return res.send(data);
            }
        }
    );
});

router.put('/', function (req, res, next) {
    delete req.body._id;
    Hero.findOneAndUpdate(
        { 'name': req.body.name },
        req.body,
        { upsert: true, new: true },
        function (err, data) {
            if (err) {
                return res.send(err);
            } else {
                return res.send(data);
            }
        }
    );
});

// Delete All terrains details from DB.
router.delete('/:id', function (req, res, next) {
    if (!req.params.id) return res.status(403).json('Hero id must be specified');
    const id = req.params.id;
    Hero.deleteOne({ id: id }, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


module.exports = router;