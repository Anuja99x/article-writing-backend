const express = require('express');
const commentController = require('../controller/commentController');

const router = express.Router();

/*
* POST-> SAVE -->Body
* DELETE-->DELETE__> headers
* PUT-->UPDATE--> body
* GET-->FETCH--> headers
*
* */

router.post('/save', commentController.saveComment)
router.put('/update', commentController.updateComment)
router.get('/get', commentController.getComment)
router.delete('/delete', commentController.deleteComment)
router.get('/getAll', commentController.getAllComment)
router.get('/search', commentController.searchComment)

module.exports = router;