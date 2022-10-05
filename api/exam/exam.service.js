const pool = require('../../config/database');

module.exports = {
    getExams: callBack => {
        pool.query('select id,title,quests from exam',
        [], 
        (error, result, fields) => {
            if(error)
            {
                return callBack(error);
            }else
            {
                result.forEach((item, index) => {

                    result[index].quests = JSON.parse(item.quests)

                });
            }

            return callBack(null, result)
        });
    },
    addExam: (data, callBack) => {
        pool.query(
            `insert into exam(title, quests) values(?,?)`,
            [
                data.title,
                '[]'
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
    deleteExam: (data, callBack) => {
        pool.query(
            `delete from exam where id=?`,
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
    updateExam: (data, callBack) => {
        pool.query(
            `update exam set title=? where id=?`,
            [
                data.title,
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
    addExamQuestion: (data, callBack) => {
        pool.query(
            `select quests from exam where id = ?`,
            [
                data.id,
            ],
            (error, results, fields) => 
            {
                if(error)
                {
                    console.log(error);
                    return callBack(error)
                }else{
                    let content = JSON.parse(results[0].quests)
                    content.push(data.question)
                    
                    pool.query(
                        `update exam set quests=? where id=?`,
                        [
                            JSON.stringify(content),
                            data.id
                        ],
                        (error, results, fields) => 
                        {
                            if(error)
                            {
                                console.log(error);
                                return callBack(error)
                            }
                        }
                    )
                }
                return callBack(null, results)
            }
        );
    },
    deleteExamQuestion: (data, callBack) => {
        pool.query(
            `select quests from exam where id=?`,
            [
                data.id,
            ],
            (error, results, fields) => 
            {
                if(error)
                {
                    console.log(error);
                    return callBack(error)
                }else{
                    let content = JSON.parse(results[0].quests)
                    content.splice(data.index, 1);
                    
                    pool.query(
                        `update exam set quests=? where id=?`,
                        [
                            JSON.stringify(content),
                            data.id
                        ],
                        (error, results, fields) => 
                        {
                            if(error)
                            {
                                console.log(error);
                                return callBack(error)
                            }
                        }
                    )
                }
                return callBack(null, results)
            }
        );
    },
    editExamQuestion: (data, callBack) => {
        pool.query(
            `select quests from exam where id = ?`,
            [
                data.id,
            ],
            (error, results, fields) => 
            {
                if(error)
                {
                    console.log(error);
                    return callBack(error)
                }else{
                    let content = JSON.parse(results[0].quests)
                    content[data.index] = data.question
                    
                    pool.query(
                        `update exam set quests=? where id=?`,
                        [
                            JSON.stringify(content),
                            data.id
                        ],
                        (error, results, fields) => 
                        {
                            if(error)
                            {
                                console.log(error);
                                return callBack(error)
                            }
                        }
                    )
                }
                return callBack(null, results)
            }
        );
    },
}