 const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.patch('/update',userController.updateUser);
router.patch('/updatePassword',userController.updatePassword);
router.get('/getAll',userController.getAllUsers);
router.get('/:userId',userController.getOneUser);
router.put('/updateName',userController.updateUserName);

module.exports = router;