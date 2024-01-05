const express = require('express');
const ContactMessageController = require('../controller/contactMessageController');

const router = express.Router();

router.get('/getAll',ContactMessageController.getAllMessages);

module.exports = router;