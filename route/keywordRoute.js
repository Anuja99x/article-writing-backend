const express = require('express');
const router = express.Router();
const keywordController = require('../controller/keywordController');

router.post('/add', keywordController.createKeyword);
router.get('/get', keywordController.getKeywords);
router.get('/count', keywordController.getKeywordCount);
router.get('/get/:topicDomainId', keywordController.getKeywordsByTopicDomainId);
router.patch('/edit/:keywordId', keywordController.editKeyword);
router.delete('/:topicDomainId', keywordController.deleteKeyword);
router.delete('/delete/:keywordId', keywordController.deleteKeywordByKeyword);
module.exports = router;
