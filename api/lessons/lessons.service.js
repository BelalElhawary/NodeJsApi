const pool = require('../../config/database');

module.exports = {
    addLesson: (data, callBack) => {
        pool.query(
            `insert into lessons(name, content, image, description) values(?,?,?,?)`,
            [
                data.name,
                data.content,
                data.image,
                data.description
            ],
            (error, results, fields) => 
            {
                if(error)
                {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getAllLessons: callBack => {
        pool.query('select id,name,content,image,description from lessons',
        [], 
        (error, result, fields) => {
            if(error)
            {
                return callBack(error);
            }

            return callBack(null, result)
        });
    },
}