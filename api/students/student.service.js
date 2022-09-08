const pool = require('../../config/database');

module.exports = {
    addStudent: (data, callBack) => {
        pool.query(
            `insert into students(code,available,name,pn,ppn,country) values(?,?,?,?,?,?)`,
            [
                Math.floor(100000000 + Math.random() * 900000000),
                0,
                data.name,
                data.pn,
                data.ppn,
                data.country,
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
    getAllStudents: callBack => {
        pool.query('select id,code,available,name,pn,ppn,country from students',
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