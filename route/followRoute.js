const express = require('express');
const followController = require('../controller/followController');

const router = express.Router();

/*
* POST-> SAVE -->Body
* DELETE-->DELETE__> headers
* PUT-->UPDATE--> body
* GET-->FETCH--> headers
*
* */

router.post('/save', followController.saveFollowWriter)
//router.put('/update', readerArticleController.updateReaderArticle)
router.get('/get', followController.getFollowWriter)
router.delete('/delete', followController.deleteFollowWriter)
router.delete('/deleteId', followController.deleteFollowWriterById)
router.get('/getAll', followController.getAllFollowWriter)
router.get('/search', followController.searchFollowWriter)

module.exports = router;