const { createAdmin, getAdmins, getAdminById, updateAdmin, login} = require('./admin.controller')
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation')

router.post('/', checkToken, createAdmin)
router.get('/all', checkToken, getAdmins)
router.get('/:id', checkToken, getAdminById)
router.patch('/', checkToken, updateAdmin)
router.post('/login', login)


module.exports = router;