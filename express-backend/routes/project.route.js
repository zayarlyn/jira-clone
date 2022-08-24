const router = require('express').Router();

const { getProject } = require('../controllers/project.controller');

router.get('/', getProject);

module.exports = router;
