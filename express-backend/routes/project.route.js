const router = require('express').Router();

const { getListsInProject, getIssuesInProject } = require('../controllers/project.controller');

router.get('/:projectId/lists', getListsInProject);
router.get('/:projectId/issues', getIssuesInProject);

module.exports = router;
