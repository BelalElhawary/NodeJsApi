const { getAllStudents, getStudentsCount, insertStudent, removeStudent, updateStudent, loginStudent, logoutStudent } = require('./student.controller');

const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

// Dashboard
router.get('/count', checkToken, getStudentsCount)
router.post('/', checkToken, getAllStudents)
router.post('/insert', checkToken, insertStudent)
router.post('/remove', checkToken, removeStudent)
router.post('/update', checkToken, updateStudent)
router.post('/login', loginStudent)
router.post('/logout', logoutStudent)



//router.post('/', checkToken, addStudent)
//router.get('/:id', checkToken,)
//router.patch('/:id', checkToken,)
//router.delete('/', checkToken, studentDelete)

module.exports = router;