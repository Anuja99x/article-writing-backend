const express = require('express');
const ContactMessageController = require('../controller/contactMessageController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

router.post('/add',ContactMessageController.saveMessage);
router.put('/update', auth, admin, ContactMessageController.updateMessage);
router.get('/getAll', auth, admin, ContactMessageController.getAllMessages);
router.get('/get',ContactMessageController.getOneMessage);
router.get('/get-count', auth, admin, ContactMessageController.getNotRepliedMessageCount);


module.exports = router;