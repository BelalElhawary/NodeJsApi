const express = require('express');
const mongoose = require('mongoose')
const AWS = require('aws-sdk')
const s3 = new AWS.S3();


//mongoose.connect('mongodb+srv://Santrafysh:Bb281655900@cluster0.uzh9nyt.mongodb.net/admins')
//const db = mongoose.connection

//db.on('error', (error) => console.error(error))
//db.once('open', () => console.log('Connected to database'))

const studentsRouter = require('./api/students/student.router')
const lessonsRouter = require('./api/lessons/lessons.router')
const adminRouter = require('./api/admins/admin.router')
const calendarRouter = require('./api/calendar.router')
const adminNotificationRouter = require('./api/admins/admin.notification.router')
const cors = require('cors');
const { checkToken } = require('./auth/token_validation')

const app = express();

// Origin
/*app.use(cors({
    origin: 'http://localhost:3000'
}))*/

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

app.listen(PORT, () => console.log(`its alive on http://localhost:${PORT}`))
