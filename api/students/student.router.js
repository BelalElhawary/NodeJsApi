const { addStudent, getAllStudents } = require('./student.controller');

const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation')

router.post('/', checkToken, addStudent)
router.get('/all', checkToken, getAllStudents)
//router.get('/:id', checkToken,)
//router.patch('/:id', checkToken,)
//router.delete('/:id', checkToken,)

module.exports = router;