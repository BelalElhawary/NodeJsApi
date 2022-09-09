const { create, getAdminById, getAdmins, updateAdmin, searchAdmins, getAdminByEmail, notifyAdd, notifyDelete, notifyEdit, notifyGetAll, notifyGetById } = require('./admin.service')
const { genSaltSync, hashSync, compareSync } = require('bcrypt')
const { sign } = require('jsonwebtoken')
module.exports = {
    createAdmin: (req, res) => {
        const body = req.body.value
        let final = {}
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt)
        create(body, (err, results) => {
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
    deleteAdmin: async (req, res) => {
        let body = req.body.key;
        let final = {}
        deleteAdmin(body, (err, results) => {
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
                    data: 'Admin deleted successfully'
                }
            }
        })
        res.json({ actions: final });
    },
    getAdmins: (req, res) => {
        if (req.body.search) {
            searchAdmins(req.body.search[0].key, (err, results) => {
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
            getAdmins((err, results) => {
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
        }
    },
    getAdminById: (req, res) => {
        const id = req.params.id;
        getAdminById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: false,
                    message: 'Record not found'
                })
            }
            return res.json({ success: true, result: results })
        })
    },
    updateAdmin: (req, res) => {
        const body = req.body.value;
        let final = {}
        if(body.password)
        {
            const salt = genSaltSync(10);
            body.password = hashSync(body.password, salt);
        }
        updateAdmin(body, (err, results) => {
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
    login: (req, res) => {
        const body = req.body;
        console.log(body)
        getAdminByEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: false,
                    message: 'Invalid email or password'
                })
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jstoken = sign({ result: results }, 'qwe1234', {
                    expiresIn: '24h'
                })
                return res.json({
                    success: true,
                    message: 'Login successfully',
                    name: results.name,
                    token: jstoken
                });
            } else {
                return res.json({
                    success: false,
                    message: 'Invalid email or password',
                })
            }
        })
    },
    notifyAdd: (req, res) => {
        const body = req.body;

        notifyAdd(body, (err, results) => {
            if (err) {
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
    notifyEdit: (req, res) => {
        const body = req.body;
        notifyEdit(body, (err, results) => {
            if (err) {
                console.log(err)
                return;
            }
            return res.json({
                success: true,
                message: 'Update successfully'
            })
        })
    },
    notifyGetAll: (req, res) => {
        notifyGetAll((err, results) => {
            if (err) {
                console.log(err)
                return;
            }
            return res.json({
                success: true,
                data: results
            })
        })
    },
    notifyGetById: (req, res) => {
        const id = req.params.id;
        notifyGetById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: false,
                    message: 'Record not found'
                })
            }
            return res.json({ success: true, data: results })
        })
    },
    notifyDelete: (req, res) => {
        const id = req.params.id;
        notifyDelete(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({ success: true, data: results })
        })
    },
}