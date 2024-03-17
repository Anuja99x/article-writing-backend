const express = require('express');
const adminImgController = require('../controller/adminImgUploadController');

const router = express.Router();

router.post('/upload',adminImgController.upload);
router.post('/setUserId',adminImgController.setUserId);


module.exports = router;