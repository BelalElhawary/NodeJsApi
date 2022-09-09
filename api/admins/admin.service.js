const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into registration(uid, name, email, password) values(UUID(),?,?,?)`,
            [
                data.name,
                data.email,
                data.password
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    notifyAdd: (data, callBack) => {
        pool.query(
            `insert into notifications(title, content, time) values(?,?,?)`,
            [
                data.title,
                data.content,
                data.time
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getAdmins: callBack => {
        pool.query('select id,name,email from registration',
            [],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, result)
            });
    },
    notifyGetAll: callBack => {
        pool.query('select id,title,content,time from notifications',
            [],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, result)
            });
    },
    getAdminById: (id, callBack) => {
        pool.query('select name,email from registration where id = ?',
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0])
            });
    },
    deleteAdmin: (data, callBack) => {
        pool.query(
            `delete from registration where id = ?`,
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
    notifyGetById: (id, callBack) => {
        pool.query('select id,title,content,time from notifications where id = ?',
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results[0])
            });
    },
    searchAdmins: (key, callBack) => {
        key = `%${key}%`
        pool.query(`select id,name,email from registration where id like ? or name like ? or email like ?`,
            [key, key, key],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, result)
            });
    },
    updateAdmin: (data, callBack) => {
        if (data.password) 
        {
            pool.query('update registration set name=?,email=?,password=? where id = ?',
                [data.name, data.email, data.password, data.id],
                (error, results, fields) => {
                    if (error) {
                        return callBack(error);
                    }

                    return callBack(null, results[0])
                });
        }else{
            pool.query('update registration set name=?,email=? where id = ?',
                [data.name, data.email, data.id],
                (error, results, fields) => {
                    if (error) {
                        return callBack(error);
                    }

                    return callBack(null, results[0])
                });
        }
    },
    notifyEdit: (data, callBack) => {
        pool.query('update notifications set title=?,content=?,time=? where id = ?',
            [data.title, data.content, data.time, data.id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results[0])
            });
    },
    getAdminByEmail: (email, callBack) => {
        pool.query(
            `select * from registration where email = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    },
    notifyDelete: (id, callBack) => {
        pool.query(
            `delete from notifications where id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    }
}