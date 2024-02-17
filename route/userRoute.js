const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.post('/signup',userController.saveUser);
router.post('/login',userController.loginUser);
router.put('/update',userController.updateUser);
router.get('/getAll',userController.getAllUsers);
router.get('/get',userController.getOneUser);
router.get('/count',userController.getUserCount);

module.exports = router;