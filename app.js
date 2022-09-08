const express = require('express');
const studentsRouter = require('./api/students/student.router')
const lessonsRouter = require('./api/lessons/lessons.router')
const adminRouter = require('./api/admins/admin.router')
const adminNotificationRouter = require('./api/admins/admin.notification.router')
const cors = require('cors');
const { checkToken } = require('./auth/token_validation')

const app = express();

// Origin
app.use(cors({
    origin: 'http://localhost:3000'
}))

// json converter
app.use(express.json())

//host port
const PORT = 2556;


app.get('/api', (req, res) => {
    res.json({
        success: true,
        message: "this rest apis is working"
    })
})

app.get('/api/check', checkToken, (req, res) => {
    return res.json({
        success: true,
        message: 'Token is valied'
    });  
})

app.use('/api/students', studentsRouter);
app.use('/api/lessons', lessonsRouter);
app.use('/api/admins', adminRouter);
app.use('/api/admins/notify', adminNotificationRouter);

app.listen(PORT, () => console.log(`its alive on http://localhost:${PORT}`))
