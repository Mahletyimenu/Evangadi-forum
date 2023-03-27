const router = require('express').Router();

const {askquestion,getAllquestions,getQuestion} = require('./question.controller.js');


router.post('/', askquestion);
router.get('/',getAllquestions);
router.post('/id',getQuestion);


module.exports = router;