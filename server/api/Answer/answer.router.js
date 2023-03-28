const { addAnswer, getAnswer } = require('./answer.controller.js');

const router = require('express').Router();

router.post('/', addAnswer)
router.post('/all', getAnswer)

module.exports = router;