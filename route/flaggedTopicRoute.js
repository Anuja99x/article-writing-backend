const express = require('express');
const router = express.Router();
const flaggedTopicController = require('../controller/flaggedTopicController');


// Route to save a flagged topic
router.post('/add', flaggedTopicController.saveFlaggedTopic);
// Route to get a flagged topic by its ID
router.get('/get/:flaggedTopicId', flaggedTopicController.getFlaggedTopicById);


router.get('/get', flaggedTopicController.getUniqueTopicIds);
module.exports = router;

