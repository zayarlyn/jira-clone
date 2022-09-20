const router = require('express').Router();

const {
  reorderLists,
  createList,
  deleteList,
  updateList,
} = require('../controllers/list.controller');

// neon
router.post('/create', createList);
router.delete('/:listId/delete', deleteList);
router.put('/:listId/update', updateList);
router.put('/reorder', reorderLists);

module.exports = router;
