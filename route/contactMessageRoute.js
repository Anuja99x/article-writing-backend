const express = require('express');
const ContactMessageController = require('../controller/contactMessageController');


const router = express.Router();

router.post('/add',ContactMessageController.saveMessage);
router.put('/update',ContactMessageController.updateMessage);
router.get('/getAll',ContactMessageController.getAllMessages);
router.get('/get',ContactMessageController.getOneMessage);
router.get('/get-count',ContactMessageController.getNotRepliedMessageCount);


module.exports = router;