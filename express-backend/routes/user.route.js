const { getProjects } = require('../controllers/project.controller');
const { getUsers, getAuthUser } = require('../controllers/user.controller');

const router = require('express').Router();

router.get('/authUser', getAuthUser);
router.get('/search', getUsers);
router.get('/:userId/projects', getProjects);

module.exports = router;
