const router = require('express').Router();

const { reorderIssues, createIssue, updateIssue } = require('../controllers/issue.controller');

router.put('/reorder', reorderIssues);

router.patch('/:id/update', updateIssue);

router.post('/create', createIssue);

module.exports = router;
