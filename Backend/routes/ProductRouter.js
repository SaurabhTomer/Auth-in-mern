const router = require('express').Router();
const {ensureAuthenticated} = require('../Middlewares/auth')

const express = require('express')


router.get('/',ensureAuthenticated, (req,res) => {
    
    res.status(200).json([
        {
            name:"mobile",
            price:10000
        },
        {
            name:"ev",
            price:2000
        }
    ])
});

module.exports = router;