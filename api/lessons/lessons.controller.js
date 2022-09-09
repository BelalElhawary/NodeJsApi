const { addLesson, getAllLessons, deleteLesson, searchLessons, updateLesson } = require('./lessons.service')

module.exports = {
    insertLesson: (req, res) => {
        const body = req.body.value
        let final = {}
        addLesson(body, (err, results) => {
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
    removeLesson: async (req, res) => {
        let body = req.body.key;
        let final = {}
        deleteLesson(body, (err, results) => {
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
                    data: 'Lesson deleted successfully'
                }
            }
        })
        res.json({ actions: final });
    },
    updateLesson: async (req, res) => {
        let body = req.body.value;
        let final = {}
        updateLesson(body, (err, results) => {
            if (err) {
                final = {
                    success: false,
                    data: err
                }
            } else {
                final = {
                    success: true,
                    data: 'Lesson updated successfully'
                }
            }
        })
        res.json({ actions: final });
    },
    getAllLessons: (req, res) => {
        if (req.body.search) {
            searchLessons(req.body.search[0].key, (err, results) => {
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
        }else{
            getAllLessons((err, results) => {
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
    getLessonsCount: (req, res) => {
        getAllLessons((err, results) => {
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
}