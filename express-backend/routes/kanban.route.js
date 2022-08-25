const router = require('express').Router();

const { getListsInKanban } = require('../controllers/kanban.controller');

router.get('/:kanbanId/lists', getListsInKanban);

module.exports = router;
