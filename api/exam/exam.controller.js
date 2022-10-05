const { getExams, addExam, addExamQuestion, deleteExamQuestion, editExamQuestion, deleteExam, updateExam } = require("./exam.service");

module.exports = {
    getExmas: (req, res) => {
        getExams((err, results) => {
            if (err) {
                console.log(err)
                return res.json({ success: false, data: 'server failure' });
            }
            return res.json({
                success: true,
                result: results,
                count: results.length
            })
        })
    },
    addExam: (req, res) => {
        const body = req.body
        let final = {}
        addExam(body, (err, results) => {
            if (err) {
                final = {
                    success: false,
                    message: 'Database connection error'
                }
            } else {
                final = {
                    success: true,
                    message: 'Exam added successfuly'
                }
            }
        });
        res.json({ actions: final });
    },
    deleteExam: (req, res) => {
        const body = req.body
        let final = {}
        deleteExam(body, (err, results) => {
            if (err) {
                final = {
                    success: false,
                    message: 'Database connection error'
                }
            } else {
                final = {
                    success: true,
                    message: 'Exam removed successfuly'
                }
            }
        });
        res.json({ actions: final });
    },
    editExam: (req, res) => {
        const body = req.body
        let final = {}
        updateExam(body, (err, results) => {
            if (err) {
                final = {
                    success: false,
                    message: 'Database connection error'
                }
            } else {
                final = {
                    success: true,
                    message: 'Exam updated successfuly'
                }
            }
        });
        res.json({ actions: final });
    },
    addExamQuestion: (req, res) => {
        const body = req.body
        let final = {}
        addExamQuestion(body, (err, results) => {
            if (err) {
                final = {
                    success: false,
                    message: 'Database connection error'
                }
            } else {
                final = {
                    success: true,
                    message: 'Exam question added successfuly'
                }
            }
        });
        res.json({ actions: final });
    },
    deleteExamQuestion: (req, res) => {
        const body = req.body
        let final = {}
        deleteExamQuestion(body, (err, results) => {
            if (err) {
                final = {
                    success: false,
                    message: 'Database connection error'
                }
            } else {
                final = {
                    success: true,
                    message: 'Exam question removed successfuly'
                }
            }
        });
        res.json({ actions: final });
    },
    editExamQuestion: (req, res) => {
        const body = req.body
        let final = {}
        editExamQuestion(body, (err, results) => {
            if (err) {
                final = {
                    success: false,
                    message: 'Database connection error'
                }
            } else {
                final = {
                    success: true,
                    message: 'Exam question updated successfuly'
                }
            }
        });
        res.json({ actions: final });
    }
}