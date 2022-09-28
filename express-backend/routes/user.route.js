const { getProjects } = require('../controllers/project.controller');
const {
  getUsers,
  getAuthUser,
  getUser,
  updateAuthUser,
} = require('../controllers/user.controller');

const router = require('express').Router();

router.get('/authUser', getAuthUser);
router.patch('/authUser/update', updateAuthUser);
router.get('/search', getUsers);
router.get('/:userId/projects', getProjects);
router.get('/:userId', getUser);

module.exports = router;
