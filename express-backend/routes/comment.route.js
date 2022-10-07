const router = require('express').Router();
const { createComment, deleteComment } = require('../controllers/comment.controller');

router.post('/create', createComment);
router.delete('/:id/delete', deleteComment);

module.exports = router;
