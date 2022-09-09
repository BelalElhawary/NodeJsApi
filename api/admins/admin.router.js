const { createAdmin, getAdmins, getAdminById, deleteAdmin, updateAdmin, login} = require('./admin.controller')
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation')

router.post('/insert', checkToken, createAdmin)
router.post('/update', checkToken, updateAdmin)
router.post('/remove', checkToken, deleteAdmin)
router.post('/', checkToken, getAdmins)
//router.get('/all', checkToken, getAdmins)
//router.get('/:id', checkToken, getAdminById)
router.post('/login', login)


module.exports = router;