const { getProjects } = require('../controllers/project.controller');
const {
  getUsers,
  getAuthUser,
  getUser,
  updateAuthUser,
  deleteAuthUser,
} = require('../controllers/user.controller.js');

const router = require('express').Router();

router.get('/authUser', getAuthUser);
router.patch('/authUser/update', updateAuthUser);
router.post('/authUser/delete', deleteAuthUser);
router.get('/search', getUsers);
router.get('/:userId/projects', getProjects);
router.get('/:userId', getUser);

module.exports = router;
