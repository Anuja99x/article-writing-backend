const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.get('/count',userController.getUserCount);
router.get('/get-writers',userController.getAllWriters);
router.get('/get-readers',userController.getAllReaders);
router.get('/get-user-by-name/:type/:username',userController.getUsersByUserName);
router.get('/get-user-count-by-month/:type',userController.getUserCountByMonthAndType);
router.get('/search/:username',userController.searchUserByUsername);
router.get('/get-others',userController.getAllOtherUsers);

module.exports = router;