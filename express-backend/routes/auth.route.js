const { signUp, logIn, logOut } = require('../controllers/auth.controller');

const router = require('express').Router();

router.post('/signup', signUp);
router.post('/login', logIn);
router.post('/logout', logOut);

module.exports = router;
