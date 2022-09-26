const router = require('express').Router();

const { getIssuesInProject } = require('../controllers/issue.controller');
const { getListsInProject } = require('../controllers/list.controller');
const { getMembersInProject } = require('../controllers/member.controller');
const { getProject, updateProject, createProject } = require('../controllers/project.controller');
const { restrictProjectMiddleware } = require('../utils/restrictProjectMiddleware');

router.get('/:projectId/lists', restrictProjectMiddleware, getListsInProject);
router.get('/:projectId/issues', restrictProjectMiddleware, getIssuesInProject);
router.get('/:projectId/members', restrictProjectMiddleware, getMembersInProject);
router.get('/:projectId', restrictProjectMiddleware, getProject);
router.put('/:projectId', restrictProjectMiddleware, updateProject);
router.post('/create', createProject);

module.exports = router;
