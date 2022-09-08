const { createAdmin, getAdmins, getAdminById, updateAdmin, login} = require('./admin.controller')
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation')

router.post('/insert', checkToken, createAdmin)
//router.post('/remove', checkToken, createAdmin)
router.post('/update', checkToken, updateAdmin)
router.post('/', checkToken, getAdmins)

router.get('/all', checkToken, getAdmins)
router.get('/:id', checkToken, getAdminById)
router.patch('/', checkToken, updateAdmin)
router.post('/login', login)


module.exports = router;