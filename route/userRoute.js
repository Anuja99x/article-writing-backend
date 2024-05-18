const express = require('express');
const userController = require('../controller/userController'); 

const router = express.Router();

router.post('/signup',userController.saveUser);
router.post('/login',userController.loginUser);
router.patch('/update',userController.updateUser);
router.get('/getAll',userController.getAllUsers);
router.get('/:userId',userController.getOneUser);

module.exports = router;