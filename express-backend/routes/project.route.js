const router = require('express').Router();

const { getIssuesInProject } = require('../controllers/issue.controller');
const { getListsInProject } = require('../controllers/list.controller');
const { getMembersInProject } = require('../controllers/member.controller');
const {
  getProject,
  updateProject,
  createProject,
  deleteProject,
  leaveProject,
} = require('../controllers/project.controller');
const { restrictProjectMiddleware: RPM } = require('../utils/restrictProjectMiddleware');

router.get('/:projectId/lists', RPM, getListsInProject);
router.get('/:projectId/issues', RPM, getIssuesInProject);
router.get('/:projectId/members', RPM, getMembersInProject);
router.get('/:projectId', RPM, getProject);
router.put('/:projectId', RPM, updateProject);
router.delete('/:projectId/delete', RPM, deleteProject);
router.delete('/:projectId/leave', RPM, leaveProject);
router.post('/create', createProject);

module.exports = router;
