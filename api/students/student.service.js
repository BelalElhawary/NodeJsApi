const pool = require('../../config/database');

function generateCode() {
    return Math.floor(100000000 + Math.random() * 900000000)
}

module.exports = {
    addStudent: (data, callBack) => {
        pool.query(`select code from students`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                let code = generateCode()
                while(results.includes(code))
                {
                    code = generateCode()
                }
                pool.query(
                    `insert into students(code,available,name,pn,ppn,country,date,admin) values(?,?,?,?,?,?,?,?)`,
                    [
                        code,
                        0,
                        data.name,
                        data.pn,
                        data.ppn,
                        data.country,
                        Date.now(),
                        data.admin
                    ],
                    (error, results, fields) => {
                        if (error) {
                            return callBack(error)
                        }
                        return callBack(null, results)
                    }
                );
            }
        )
    },
    getAllStudents: callBack => {
        pool.query('select id,code,available,name,pn,ppn,country,admin,date from students',
            [],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result)
            });
    },
    getProfile: (data, callBack) => {
        pool.query('select name,pn,ppn,country,date from students where code = ?',
            [data.code],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result[0])
            });
    },
    searchStudents: (key, callBack) => {
        key = `%${key}%`
        pool.query('select id,code,available,name,pn,ppn,country,admin from students where id like ? or code like ? or name like ?',
            [key, key, key,],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, result)
            });
    },
    studentDelete: (data, callBack) => {
        pool.query(
            `delete from students where id = ?`,
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
    studentUpdate: (data, callBack) => {
        pool.query(
            `update students set name=?,pn=?,ppn=?,country=? where id = ?`,
            [data.name, data.pn, data.ppn, data.country, data.id],
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    loginStudent: (data, callBack) => {
        pool.query(
            `select available from students where code = ?`,
            [data],
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    return callBack(error);
                }
                if (results[0]) {
                    const final = results[0].available
                    if (final == 0) {
                        pool.query(
                            `update students set available=? where code=?`,
                            [1, data],
                            (eerror, rresults, ffields) => {
                                if (eerror) {
                                    console.log(eerror);
                                    return callBack(eerror);
                                }
                                return callBack(null, final);
                            }
                        )
                    }
                    else
                        return callBack('Student code already in use, you need to logout first in order to use this code');
                }
                else {
                    return callBack('Record not found, please check your code again or contact your admin');
                }

            }
        )
    },
    logoutStudent: (data, callBack) => {
        pool.query(
            `select available from students where code = ?`,
            [data],
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    return callBack(error);
                }
                if (results[0]) {
                    pool.query(
                        `update students set available=? where code=?`,
                        [0, data],
                        (eerror, rresults, ffields) => {
                            if (eerror) {
                                console.log(eerror);
                                return callBack(eerror);
                            }
                            return callBack(null, 1);
                        }
                    )

                }
                else {
                    return callBack('Record not found, please check your code again or contact your admin');
                }

            }
        )
    },
}