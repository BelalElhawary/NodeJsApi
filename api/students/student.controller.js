const { addStudent, getAllStudents, studentDelete, studentUpdate, loginStudent, logoutStudent } = require('./student.service')

module.exports = {
    insertStudent: async (req, res) => {
        let body = req.body.value;
        let final = {}
        addStudent(body, (err, results) => {
            if (err) {
                final = {
                    success: false,
                    message: 'Database connection error'
                }
            } else {
                final = {
                    success: true,
                    result: results
                }
            }
        });
        res.json({ actions: final });
    },
    removeStudent: async (req, res) => {
        let body = req.body.key;
        let final = {}
        studentDelete(body, (err, results) => {
            if (err) {
                final = {
                    success: false,
                    data: err
                }
            } else if (!results) {
                final = {
                    success: false,
                    data: 'Record not found'
                }
            } else {
                final = {
                    success: true,
                    data: 'Student deleted successfully'
                }
            }
        })
        res.json({ actions: final });
    },
    updateStudent: async (req, res) => {
        let body = req.body.value;
        console.log(body)
        let final = {}
        studentUpdate(body, (err, results) => {
            if (err) {
                final = {
                    success: false,
                    data: err
                }
            } else {
                final = {
                    success: true,
                    data: 'Student updated successfully'
                }
            }
        })
        res.json({ actions: final });
    },
    getAllStudents: (req, res) => {
        if (req.body.search) {
            searchStudents(req.body.search[0].key, (err, results) => {
                if (err) {
                    console.log(err)
                    return;
                }
                return res.json({
                    success: true,
                    result: results,
                    count: results.length
                })
            })
        } else {
            getAllStudents((err, results) => {
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
        }
    },
    getStudentsCount: (req, res) => {
        getAllStudents((err, results) => {
            if (err) {
                console.log(err)
                return res.json({ success: false, data: 'server failure' });
            }
            return res.json({
                success: true,
                result: results.length
            })
        })
    },
    loginStudent: (req, res) => {
        const code = req.body.code
        loginStudent(code, (err, result)=>{
            if(err)
            {
                console.log(err);
                return res.json({ success: false, data: err });
            }
            return res.json({
                success: true,
                data: `this code is now active you can't use it on other devices`
            })
        })
    },
    logoutStudent: (req, res) => {
        const code = req.body.code
        logoutStudent(code, (err, result)=>{
            if(err)
            {
                console.log(err);
                return res.json({ success: false, data: err });
            }
            return res.json({
                success: true,
                data: `this code is now avalible`
            })
        })
    },
}