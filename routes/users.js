const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const { authJWT } = require('../middlewares/auth');

//! Public route
router.post('/signup', userCtrl.signupUser);
router.post('/login', userCtrl.loginUser);

//! Private Route
router.get('/me', authJWT, userCtrl.userProfile);
router.delete('/me', authJWT, userCtrl.deleteUser);
router.put('/me', authJWT, userCtrl.updateUser);

module.exports = router;
