const { getAllStudents, getStudentsCount, insertStudent, removeStudent, updateStudent, loginStudent, logoutStudent, getProfile } = require('./student.controller');

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
router.post('/profile', getProfile)
router.get('/', checkToken, getAllStudents)

module.exports = router;