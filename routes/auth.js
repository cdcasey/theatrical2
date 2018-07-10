'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });
const userModel = require('../models/users');
const bcrypt = require('bcrypt');


router.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/');
});

router.post('/', (req, res, next) => {
    console.log(req.body);

    userModel.getByEmail(req.body.email)
        .then((user) => {
            if (!user) {
                res.status(400).send('Email not found');
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((success) => {
                        console.log(success);
                        if (success) {
                            // req.session.user_id = user.id;
                            res.json({ user });
                        } else {
                            res.status(401).json('Bad Password');
                        }
                    })
                    .catch((err) => {
                        next(err);
                    })
            }
        })
});


module.exports = router;
