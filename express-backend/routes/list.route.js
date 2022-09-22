const router = require('express').Router();

const {
  reorderLists,
  createList,
  deleteList,
  updateList,
} = require('../controllers/list.controller');

// neon
router.post('/create', createList);
router.delete('/:id/delete', deleteList);
router.patch('/:id/update', updateList);
router.put('/reorder', reorderLists);

module.exports = router;
