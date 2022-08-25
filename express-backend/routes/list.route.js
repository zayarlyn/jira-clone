const router = require('express').Router();

const { getIssuesInList } = require('../controllers/list.controller');

router.get('/', getIssuesInList);
router.get('/:listId/issues', getIssuesInList);

module.exports = router;
