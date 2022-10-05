const pool = require('../../config/database');

module.exports = {
    getPost: callBack => {
        pool.query('select id,name,title,image,reaction from post',
        [], 
        (error, result, fields) => {
            if(error)
            {
                return callBack(error);
            }else
            {
                result.forEach((item, index) => {

                    result[index].reaction = JSON.parse(item.reaction)

                });
            }

            return callBack(null, result)
        });
    },
    addPost: (data, callBack) => {
        pool.query(
            `insert into post(name,title,image,reaction) values(?,?,?,?)`,
            [
                data.name,
                data.title,
                data.image,
                data.reaction
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
    deletePost: (data, callBack) => {
        pool.query(
            `delete from post where id=?`,
            [
                data.id
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
    updatePost: (data, callBack) => {
        pool.query(
            `update post set name=?,title=?,image=?,reaction=? where id=?`,
            [
                data.name,
                data.title,
                data.image,
                data.reaction,
                data.id
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
}