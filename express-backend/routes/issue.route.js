const router = require('express').Router();

const { getIssues } = require('../controllers/issue.controller');

router.get('/note', getIssues);

module.exports = router;
