const pool = require('../../config/database');

module.exports = {
    addLesson: (data, callBack) => {
        pool.query(
            `insert into lessons(name, link, content, image, description) values(?,?,?,?,?)`,
            [
                data.name,
                data.link,
                data.content,
                data.image,
                data.description
            ],
            (error, results, fields) => 
            {
                if(error)
                {
                    console.log(error);
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    deleteLesson: (data, callBack) => {
        pool.query(
            `delete from lessons where id = ?`,
            [data.id],
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    updateLesson: (data, callBack) => {
        pool.query(
            `update lessons set name=?,link=?,content=?,image=?,description=? where id = ?`,
            [data.name, data.link, data.content, data.image, data.description, data.id],
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    searchLessons: (key, callBack) => {
        key = `%${key}%`
        pool.query('select id,name,content,image,description from lessons where id like ? or name like ? or description like ?',
            [key, key,key],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result)
            });
    },
    getAllLessons: callBack => {
        pool.query('select id,name,link,content,image,description from lessons',
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