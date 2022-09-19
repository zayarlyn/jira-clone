const router = require('express').Router();

const { getIssuesInProject } = require('../controllers/issue.controller');
const { getListsInProject } = require('../controllers/list.controller');
const { getMembersInProject } = require('../controllers/member.controller');
const { getProject, updateProject, getProjects } = require('../controllers/project.controller');

router.get('/lists', getListsInProject);
router.get('/issues', getIssuesInProject);
router.get('/members', getMembersInProject);
router.get('/', getProject);
router.put('/', updateProject);

module.exports = router;
