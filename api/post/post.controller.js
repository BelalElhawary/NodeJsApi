const { getPost, addPost, deletePost, updatePost } = require("./post.service");

module.exports = {
    getPosts: (req, res) => {
        getPost((err, results) => {
            if (err) {
                console.log(err)
                return res.json({ success: false, data: 'server failure' });
            }
            return res.json({
                success: true,
                result: results,
                count: results.length
            })
        })
    },
    addPost: (req, res) => {
        const body = req.body
        let final = {}
        addPost(body, (err, results) => {
            if (err) {
                final = {
                    success: false,
                    message: 'Database connection error'
                }
            } else {
                final = {
                    success: true,
                    message: 'Post added successfuly'
                }
            }
        });
        res.json({ actions: final });
    },
    deletePost: (req, res) => {
        const body = req.body
        let final = {}
        deletePost(body, (err, results) => {
            if (err) {
                final = {
                    success: false,
                    message: 'Database connection error'
                }
            } else {
                final = {
                    success: true,
                    message: 'Post removed successfuly'
                }
            }
        });
        res.json({ actions: final });
    },
    editPost: (req, res) => {
        const body = req.body
        let final = {}
        updatePost(body, (err, results) => {
            if (err) {
                final = {
                    success: false,
                    message: 'Database connection error'
                }
            } else {
                final = {
                    success: true,
                    message: 'Post updated successfuly'
                }
            }
        });
        res.json({ actions: final });
    }
}