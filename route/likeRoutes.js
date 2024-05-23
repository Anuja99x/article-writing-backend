const express = require('express');
const likeController = require('../controller/likeController');


const router = express.Router();

/*
* POST-> SAVE -->Body
* DELETE-->DELETE__> headers
* PUT-->UPDATE--> body
* GET-->FETCH--> headers
*
* */

router.post('/save', likeController.saveLikeWriter)
router.post('/get', likeController.getLikeWriter)
router.delete('/delete', likeController.deleteLikeWriter)
router.delete('/deleteId', likeController.deleteLikeWriterById)
router.get('/getAll', likeController.getAllLikeWriter)
router.get('/search', likeController.searchLikeWriter)


module.exports = router;