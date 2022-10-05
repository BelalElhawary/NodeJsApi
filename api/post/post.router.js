const router = require('express').Router();
const {checkToken} = require('../../auth/token_validation');
const { getPosts, addPost, editPost, deletePost} = require('./post.controller');

router.get('/', getPosts)
/*router.get('/:id', getExamById)
router.post('/', checkToken, getExams)
router.post('/:id', checkToken, getExamById)*/
router.post('/edit', checkToken, editPost)
router.post('/delete', checkToken, deletePost)
router.post('/add', checkToken, addPost)


module.exports = router;