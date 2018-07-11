const express = require('express');
const router = express.Router();

const productionsModel = require('../models/productions');

router.get('/', (req, res, next) => {
    productionsModel.byUser(req.headers.userid)
        .then((productions) => {
            res.json({ productions });
        })
        .catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
    productionsModel.getById(req.params.id)
        .then((productions) => {
            res.json({ productions });
        })
        .catch(err => next);
});

router.post('/', (req, res, next) => {
    productionsModel.create(req.body)
        .then((production) => {
            res.json({ production });
        })
        .catch((err) => {
            res.status(400).send('That production already exists');
            next(err);
        })
});

router.patch('/:id', (req, res, next) => {
    productionsModel.update(req.params.id, req.body)
        .then((production) => {
            res.json({ production });
            // res.redirect(`/productions`);
        })
        .catch((err) => {
            next(err);
        })
});

router.delete('/:id', (req, res, next) => {
    productionsModel.delete(req.params.id)
        .then((production) => {
            res.json({ message: '1 production deleted' });
        })
        .catch((err) => {
            next(err);
        })

});

module.exports = router;