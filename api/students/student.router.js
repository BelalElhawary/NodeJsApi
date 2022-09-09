const { getAllStudents, getStudentsCount, insertStudent, removeStudent, updateStudent, loginStudent, logoutStudent } = require('./student.controller');

const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

// Dashboard
router.post('/', checkToken, getAllStudents)
router.get('/count', checkToken, getStudentsCount)
router.post('/insert', checkToken, insertStudent)
router.post('/remove', checkToken, removeStudent)
router.post('/update', checkToken, updateStudent)
router.post('/login', loginStudent)
router.post('/logout', logoutStudent)

module.exports = router;