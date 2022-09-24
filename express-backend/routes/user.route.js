const { getProjects } = require('../controllers/project.controller');
const { getUsers, getAuthUser, getUser } = require('../controllers/user.controller');

const router = require('express').Router();

router.get('/authUser', getAuthUser);
router.get('/search', getUsers);
router.get('/:userId/projects', getProjects);
router.get('/:userId', getUser);

module.exports = router;
