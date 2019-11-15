const express = require('express')
const userHandler = require('../handlers/userHandler')
const router = express.Router();

router.post('/signup',userHandler.signup)
router.post('/login',userHandler.login)
module.exports = router