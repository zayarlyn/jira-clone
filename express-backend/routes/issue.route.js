const router = require('express').Router();

const { getComments } = require('../controllers/comment.controller');
const {
  reorderIssues,
  createIssue,
  updateIssue,
  deleteIssue,
} = require('../controllers/issue.controller');

router.get('/:issueId/comments', getComments);
router.put('/reorder', reorderIssues);
router.post('/create', createIssue);
router.patch('/:id/update', updateIssue);
router.delete('/:id/delete', deleteIssue);

module.exports = router;
