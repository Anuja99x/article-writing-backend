const express = require('express');
const topicDomainController = require('../controller/topicDomainController');
const router = express.Router();


router.post('/add', topicDomainController.createTopicDomain);
// Define route for retrieving topic domains
router.get('/get', topicDomainController.getTopicDomains);
router.delete('/:topicDomainId', topicDomainController.deleteTopicDomain);
router.patch('/edit/:topicDomainId', topicDomainController.editTopicDomain);
router.get('/count', topicDomainController.getTopicDomainCount);
router.get('/get/:topicDomainId', topicDomainController.getTopicDomainsByTopicDomainId);



module.exports = router;

