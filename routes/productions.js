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
        .catch(err => next(err));
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

router.get('/:id/cast', (req, res, next) => {
    productionsModel.castList(req.params.id)
        .then((cast) => {
            res.json({ cast })
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/:id/dates', (req, res, next) => {
    const rehearsal_dates = productionsModel.rehearsalDates(req.params.id);
    const production_dates = productionsModel.productionDates(req.params.id);
    const blackout_dates = productionsModel.blackoutDates(req.params.id);
    Promise.all([rehearsal_dates, production_dates, blackout_dates])
        .then((data) => {
            res.json({ rehearsal_dates: data[0], production_dates: data[1], blackout_dates: data[2] })
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;