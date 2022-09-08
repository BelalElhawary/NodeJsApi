//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWQiOjQsInVpZCI6Ijc4OWFkNjIyLTEzMmYtMTFlZC05ZmNlLTk4OTA5NmE3ZTNlYiIsIm5hbWUiOiJCZWxhbCIsImVtYWlsIjoiYmVib2dhbWVkZXZlbG9wZXJAZ21haWwuY29tIn0sImlhdCI6MTY1OTg4MTA3NiwiZXhwIjoxNjU5OTY3NDc2fQ.J79zSETnBztHCTNt4cBSY51H4-uwa8tlJvYYzEkdhCU

const { verify } = require('jsonwebtoken')

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get('authorization');
        if(token)
        {
            token = token.slice(7)
            verify(token, 'qwe1234', (err, decoded) => {
                if(err)
                {
                    res.json({
                        success: false,
                        message: 'Invalid token'
                    })
                }else{
                    next()
                }
            })
        }else{
            res.json({
                success: false,
                message: 'Access denied! unauthorized user'
            })
        }
    }
}