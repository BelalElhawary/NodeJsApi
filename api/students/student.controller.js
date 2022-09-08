const { addStudent, getAllStudents } = require('./student.service')

module.exports = {
    addStudent: (req, res) => {
        const body = req.body
        addStudent(body, (err, results) => {
            if(err){
                console.log(err)
                return res.status(500).json({
                    success: false,
                    message: 'Database connection error'
                });
            }

            return res.status(200).json({
                success: true,
                data: results
            })
        });
    },
    getAllStudents: (req, res) => {
        getAllStudents((err, results) => {
            if(err){
                console.log(err)
                return;
            }
            return res.json({
                success: true,
                data: results
            })
        })
    },
}