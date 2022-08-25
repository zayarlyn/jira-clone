const router = require('express').Router();

const { getListsInProject } = require('../controllers/project.controller');

router.get('/:projectId/lists', getListsInProject);

module.exports = router;
