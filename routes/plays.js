const express = require('express');
const router = express.Router();

const playsModel = require('../models/plays');

router.get('/', (req, res, next) => {
    playsModel.all()
        .then((plays) => {
            res.json({ plays });
        })
        .catch(err => next);
});

router.get('/:id', (req, res, next) => {
    playsModel.getById(req.params.id)
        .then((plays) => {
            res.json({ plays });
        })
        .catch(err => next);
});

router.post('/', (req, res, next) => {
    playsModel.create(req.body)
        .then((play) => {
            res.json({ play });
        })
        .catch((err) => {
            res.status(400).send('That play already exists');
            next(err);
        })
});

router.patch('/:id', (req, res, next) => {
    playsModel.update(req.params.id, req.body)
        .then((play) => {
            res.json({ play });
            // res.redirect(`/plays`);
        })
        .catch((err) => {
            next(err);
        })
});

router.delete('/:id', (req, res, next) => {
    playsModel.delete(req.params.id)
        .then((play) => {
            res.json({ message: '1 play deleted' });
        })
        .catch((err) => {
            next(err);
        })

});

module.exports = router;