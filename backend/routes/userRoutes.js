const express = require('express');
const router = express.Router();
const { createUserValidations, loginValidations } = require('../validator/userValidation');
const { createUser, loginUser, logoutUser } = require('../controller/userController');

router.post('/create-user', createUserValidations, createUser); // Sign up User
router.post('/login', loginValidations, loginUser); // Sign in user
router.post('/logout', logoutUser); // logout User

module.exports = router;