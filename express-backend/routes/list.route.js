const router = require('express').Router();

const { getIssuesInList, reorderLists } = require('../controllers/list.controller');

router.get('/', getIssuesInList);
router.get('/:listId/issues', getIssuesInList);

// neon
router.put('/reorder', reorderLists);

module.exports = router;
