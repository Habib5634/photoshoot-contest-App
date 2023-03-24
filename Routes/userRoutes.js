const express = require('express');
const { getAllUsers, registerController, loginController } = require('../Controller/userController');


//routes object 
const router = express.Router();


//get all users GET
router.get('/all-users', getAllUsers)

//create user || POST
router.post('/register', registerController);

// login user || POST
router.post('/login', loginController)

module.exports = router


