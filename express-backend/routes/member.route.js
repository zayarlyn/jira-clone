const router = require('express').Router();
const { removeMember, addMember } = require('../controllers/member.controller');

router.put('/add', addMember);
router.delete('/remove', removeMember);

module.exports = router;
