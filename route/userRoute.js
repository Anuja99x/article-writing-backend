const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.patch('/update',userController.updateUser);
router.get('/getAll',userController.getAllUsers);
router.get('/:userId',userController.getOneUser);

module.exports = router;