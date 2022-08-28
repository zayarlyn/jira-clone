const router = require('express').Router();

const { reorderLists } = require('../controllers/list.controller');

// neon
router.put('/reorder', reorderLists);

module.exports = router;
