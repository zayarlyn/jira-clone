const router = require('express').Router();

const { reorderIssues } = require('../controllers/issue.controller');

router.put('/reorder', reorderIssues);

module.exports = router;
