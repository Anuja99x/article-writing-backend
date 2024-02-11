const express = require('express');
const router = express.Router();
const keywordController = require('../controller/keywordController');

router.post('/add', keywordController.createKeyword);
router.get('/count', keywordController.getKeywordCount);
module.exports = router;
