const router = require('express').Router();

const { reorderLists, createList, deleteList } = require('../controllers/list.controller');

// neon
router.post('/create', createList);
router.delete('/:listId/delete', deleteList);
router.put('/reorder', reorderLists);

module.exports = router;
