
const express = require('express');
const TopicController = require('../controller/topicController');

const router = express.Router();

router.post('/add', TopicController.saveTopic);
router.put('/update/:id', TopicController.updateTopic);
// Route without search word
router.get('/', TopicController.getAllTopics);

// Route with search word
router.get('/search', TopicController.getAllTopics);
router.get('/get/:id', TopicController.getOneTopic);

router.get('/domain/:domainName', TopicController.getTopicsByDomain);

module.exports = router;
