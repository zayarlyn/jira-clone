const router = require('express').Router();

const { getIssuesInProject } = require('../controllers/issue.controller');
const { getListsInProject } = require('../controllers/list.controller');
const { getMembersInProject } = require('../controllers/member.controller');
const { getProject, updateProject, getProjects } = require('../controllers/project.controller');

router.get('/', getProjects);
router.get('/:projectId/lists', getListsInProject);
router.get('/:projectId/issues', getIssuesInProject);
router.get('/:projectId/members', getMembersInProject);
router.get('/:projectId', getProject);
router.put('/:projectId', updateProject);

module.exports = router;
