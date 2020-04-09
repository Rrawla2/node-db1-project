const express = require('express');

const db = require("../data/dbConfig.js");

const router = express.Router();

router.get('/', (req, res) => {
    db('accounts')
        .then(accounts => {
            res.json(accounts)
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error retrieving the accounts" })
        })
});

router.get('/:id', (req, res) => {

});

router.post('/', (req, res) => {

});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

module.exports = router;
