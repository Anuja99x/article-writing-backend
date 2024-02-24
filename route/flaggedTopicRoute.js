const express = require('express');
const router = express.Router();
const flaggedTopicController = require('../controller/flaggedTopicController');


// Route to save a flagged topic
router.post('/add', flaggedTopicController.saveFlaggedTopic);
// Route to get a flagged topic by its ID
router.get('/:flaggedTopicId', flaggedTopicController.getFlaggedTopicById);

module.exports = router;

