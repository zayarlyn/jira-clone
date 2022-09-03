const router = require('express').Router();

const { reorderIssues, createIssue } = require('../controllers/issue.controller');

router.put('/reorder', reorderIssues);

router.post('/create', createIssue);

module.exports = router;
