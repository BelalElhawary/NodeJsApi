const express = require('express');

const postRouter = require('./api/post/post.router')
const examRouter = require('./api/exam/exam.router')
const studentsRouter = require('./api/students/student.router')
const lessonsRouter = require('./api/lessons/lessons.router')
const adminRouter = require('./api/admins/admin.router')
const calendarRouter = require('./api/calendar.router')
const adminNotificationRouter = require('./api/admins/admin.notification.router')
const cors = require('cors');
const { checkToken } = require('./auth/token_validation')

const app = express();

//var morgan = require('morgan')
//app.use(morgan('combined'))

// Origin
app.use(cors())

// json converter
app.use(express.json())

//host port
const PORT = 8080;

app.get('/', (req, res) => {
    res.json({title:"This api is working"})
})


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
app.use('/api/calendar', calendarRouter)
app.use('/api/exam', examRouter);
app.use('/api/post', postRouter);

app.listen(PORT, () => console.log(`its alive on http://localhost:${PORT}`))
