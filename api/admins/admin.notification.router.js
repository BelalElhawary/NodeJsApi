const { notifyAdd, notifyDelete, notifyEdit, notifyGetAll, notifyGetById } = require('./admin.controller')
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation')

router.get('/all', checkToken, notifyGetAll)
router.get('/:id', checkToken, notifyGetById)
router.post('/add', checkToken, notifyAdd)
router.patch('/edit', checkToken, notifyEdit)
router.delete('/remove/:id', checkToken, notifyDelete)

module.exports = router;