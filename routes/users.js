const express = require('express');
const router = express.Router();

const usersModel = require('../models/users');

router.get('/', (req, res, next) => {
    usersModel.all()
        .then((users) => {
            res.json({ users });
        })
        .catch(err => next);
});

router.get('/:id', (req, res, next) => {
    usersModel.getById(req.params.id)
        .then((user) => {
            res.json({ user });
        })
        .catch(err => next);
});

router.post('/', (req, res, next) => {
    usersModel.create(req.body)
        .then((user) => {
            // req.session.user_id = user[0].id;
            // setTimeout(() => { res.status(201).redirect(`/users/${req.session.user_id}/profile`) }, 1000);
            res.json({ user });
        })
        .catch((err) => {
            res.status(400).send('A user with that email already exists');
            next(err);
        })
});

router.patch('/:id', (req, res, next) => {
    usersModel.update(req.params.id, req.body)
        .then((user) => {
            res.redirect(`/users/${req.params.id}/profile`);
        })
        .catch((err) => {
            next(err);
        })
});

router.delete('/:id', (req, res, next) => {
    usersModel.delete(req.params.id)
        .then((user) => {
            res.json({ message: '1 user deleted' });
        })
        .catch((err) => {
            next(err);
        })

});

module.exports = router;