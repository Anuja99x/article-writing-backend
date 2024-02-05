const express = require('express');
const router = express.Router();
const keywordController = require('../controller/keywordController');

router.post('/add', keywordController.createKeyword);

module.exports = router;