const { addLesson, getAllLessons } = require('./lessons.controller');

const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation')

router.post('/', checkToken, addLesson)
router.get('/all', checkToken, getAllLessons)
//router.get('/:id', checkToken,)
//router.patch('/:id', checkToken,)
//router.delete('/:id', checkToken,)


module.exports = router;