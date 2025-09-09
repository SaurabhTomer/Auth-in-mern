const router = require('express').Router();
const {signupvalidation , loginvalidation} = require('../Middlewares/AuthValidation')

const {signup , login} = require('../Controllers/AuthController')




router.post('/signup',signupvalidation , signup);
router.post('/login',loginvalidation , login);

module.exports = router;