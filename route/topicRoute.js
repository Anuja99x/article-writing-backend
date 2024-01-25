
const express = require('express');
const TopicController = require('../controller/topicController');

const router = express.Router();

router.post('/add', TopicController.saveTopic);
router.put('/update/:id', TopicController.updateTopic);
router.get('/getAll', TopicController.getAllTopics);
router.get('/get/:id', TopicController.getOneTopic);

module.exports = router;
