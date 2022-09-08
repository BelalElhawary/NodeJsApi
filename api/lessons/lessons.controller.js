const { addLesson, getAllLessons } = require('./lessons.service')

module.exports = {
    addLesson: (req, res) => {
        const body = req.body
        addLesson(body, (err, results) => {
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
    getAllLessons: (req, res) => {
        getAllLessons((err, results) => {
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