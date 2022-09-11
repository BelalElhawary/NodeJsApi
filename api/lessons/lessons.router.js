const { insertLesson, getAllLessons, getLessonsCount, removeLesson, updateLesson } = require('./lessons.controller');

const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation')

router.get('/count', checkToken, getLessonsCount)
router.post('/', checkToken, getAllLessons)
router.post('/insert', checkToken, insertLesson)
router.post('/remove', checkToken, removeLesson)
router.post('/update', checkToken, updateLesson)

module.exports = router;