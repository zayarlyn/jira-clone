const { getUsers } = require('../controllers/user.controller');

const router = require('express').Router();

router.get('/search', getUsers);

module.exports = router;
