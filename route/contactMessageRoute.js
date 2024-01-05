const express = require('express');
const ContactMessageController = require('../controller/contactMessageController');

const router = express.Router();

router.post('/add',ContactMessageController.saveMessage);
router.patch('/update',ContactMessageController.updateMessage);
router.get('/getAll',ContactMessageController.getAllMessages);
router.get('/get',ContactMessageController.getOneMessage);


module.exports = router;