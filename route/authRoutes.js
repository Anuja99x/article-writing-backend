const express = require('express');
const authController = require('../controller/authController');

const router = express.Router();

router.post('/signup',authController.saveUser);
router.post('/login',authController.loginUser);
router.post('/reset',authController.sendEmailToResetPassowrd);

module.exports = router;