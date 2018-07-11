const express = require('express');
const router = express.Router();

const scenesModel = require('../models/scenes');

router.get('/', (req, res, next) => {
    scenesModel.all()
        .then((scenes) => {
            res.json({ scenes });
        })
        .catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
    scenesModel.getById(req.params.id)
        .then((scenes) => {
            res.json({ scenes });
        })
        .catch(err => next(err));
});

router.post('/', (req, res, next) => {
    scenesModel.create(req.body)
        .then((scene) => {
            res.json({ scene });
        })
        .catch((err) => {
            res.status(400).send('That scene already exists');
            next(err);
        })
});

router.patch('/:id', (req, res, next) => {
    scenesModel.update(req.params.id, req.body)
        .then((scene) => {
            res.json({ scene });
            // res.redirect(`/scenes`);
        })
        .catch((err) => {
            next(err);
        })
});

router.delete('/:id', (req, res, next) => {
    scenesModel.delete(req.params.id)
        .then((scene) => {
            res.json({ message: '1 scene deleted' });
        })
        .catch((err) => {
            next(err);
        })

});

module.exports = router;