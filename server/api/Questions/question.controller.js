const {questionTable,allQuestions,selectQuestion} = require('./question.service.js');

const pool = require('../../config/database.js');


module.exports = {
    askquestion:(req, res)=>{
        const {question} = req.body;
        if(!question){
            return res.status(400).json({
                msg:"the question field is not provided",

            });
        }
        questionTable(req.body,(err,result)=>{
            if(err){
                return res.status(500).json({
                    msg: "database connection error",
                });
            }
            return res.status(200).json({
                msg: 'Question added succesfully',
                data: result,
            })

        })
    },
    getAllquestions: (req, res) => {
        allQuestions((err, result) => {
            if (err)
                return res.status(500).json({
                    msg: "database connection error",
                });
            return res.status(200).json({
                questions: result,
            });
        });
      },
    
    getQuestion: (req, res) => {
        selectQuestion(req.body, (err, result) => {
            if (err)
                return res.status(500).json({
                    msg: "database connection error!",
                });
            return res.status(200).json({
                data: result,
            });
        });
    },

}
