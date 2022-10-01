const {
  logIn,
  logOut,
  register,
  changePwd,
  authMiddleware,
} = require('../controllers/auth.controller');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', logIn);
router.post('/logout', logOut);
router.put('/changePwd', authMiddleware, changePwd);

module.exports = router;
