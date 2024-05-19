const express = require('express');
const reportWriterController = require('../controller/reportedWriterController');

const router = express.Router();


router.post('/save', reportWriterController.saveReportedWriters)
router.get('/get', reportWriterController.getUniqueReportedWriterIds);
router.delete('/delete/:writerId', reportWriterController.deleteDeactivatedDataByWriterId);

module.exports = router;