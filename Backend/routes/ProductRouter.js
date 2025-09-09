const router = require('express').Router();
const {ensureAuthnticated} = require('../Middlewares/auth')




router.get('/',ensureAuthnticated, (req,res) => {
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