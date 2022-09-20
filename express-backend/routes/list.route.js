const router = require('express').Router();

const { reorderLists, createList } = require('../controllers/list.controller');

// neon
router.post('/create', createList);
router.put('/reorder', reorderLists);

module.exports = router;
