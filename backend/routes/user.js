const express = require('express');

//controller functions
const { signupUser, loginUser } = require('../controllers/userController');

const router = express.Router();

//LOGIN route
router.post('/login', loginUser);

//SIGNUP route
router.post('/signup', signupUser);

module.exports = router;
