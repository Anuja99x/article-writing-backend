const express = require('express');
const fileController = require('../controller/fileUploadController');

const router = express.Router();

router.post('/upload',fileController.upload);
router.post('/setUserId',fileController.setUserId);


module.exports = router;