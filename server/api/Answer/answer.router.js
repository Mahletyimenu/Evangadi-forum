const router = require('express').Router();

const { addAnswer, getAnswer } = require('./answer.controller.js');

router.post('/', addAnswer);
router.post('/allanswers', getAnswer);

module.exports = router;