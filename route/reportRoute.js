const express = require('express');
const reportController = require('../controller/reportController');

const router = express.Router();


router.post('/save', reportController.saveReported)

module.exports = router;