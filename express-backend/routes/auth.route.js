const { logIn, logOut, register } = require('../controllers/auth.controller');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', logIn);
router.post('/logout', logOut);

module.exports = router;
