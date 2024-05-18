const express = require('express');
const articleApprovalController = require('../controller/articleApprovalController');

const router = express.Router();

router.post('/save', articleApprovalController.saveApproval);
router.get('/history', articleApprovalController.getApprovalHistory);

module.exports = router;