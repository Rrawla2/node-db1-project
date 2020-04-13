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
    const { id } = req.params
    db('accounts')
        .where({ id })
            .then(account => {
                res.json(account)
            })
            .catch(err => {
                res.status(500).json({ message: "There was an error retrieving this account" })
            })

});

router.post('/', (req, res) => {
    const accountData = req.body
    db('accounts')
        .insert(accountData)
            .then(account => {
                res.status(201).json(account)
            })
            .catch(err => {
                res.status(500).json({ message: "Failed to create a new account" })
            })
});

router.put('/:id', (req, res) => {
    const { id } = req.params
    const updates = req.body
    db('accounts')
        .where({ id })
        .update(updates)
        .then(count => {
            if(count) {
                res.json({ updated: count })
            } else {
                res.status(404).json({ message: "Invalid Account ID"})
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error updating this account"})
        })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params
    db('accounts')
        .where({ id })
        .del()
        .then(count => {
            if(count) {
                res.status(200).json({ message: "This account no longer exists!" })
            } else {
                res.status(404).json({ message: "This account does not exist!" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "This account could not be deleted" })
        })
});

module.exports = router;
