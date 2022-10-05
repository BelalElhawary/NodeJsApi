const router = require('express').Router();
const {checkToken} = require('../../auth/token_validation');
const { getExmas, addExam, addExamQuestion, editExamQuestion, deleteExamQuestion, editExam, deleteExam } = require('./exam.controller');

router.get('/', getExmas)
/*router.get('/:id', getExamById)
router.post('/', checkToken, getExams)
router.post('/:id', checkToken, getExamById)*/
router.post('/edit', checkToken, editExam)
router.post('/delete', checkToken, deleteExam)
router.post('/add', checkToken, addExam)
router.post('/quest/add', checkToken, addExamQuestion)
router.post('/quest/update', checkToken, editExamQuestion)
router.post('/quest/remove', checkToken, deleteExamQuestion)


module.exports = router;