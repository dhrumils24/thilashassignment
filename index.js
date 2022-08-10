const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const URL = 'mongodb+srv://dhrumildev:Shivani%401997@cluster0.wtu99bj.mongodb.net/sheyresume'
mongoose.connect(URL, {useUnifiedTopology: true, useNewUrlParser: true})
const connection = mongoose.connection

connection.on('connected', ()=> {
    console.log('MongoDB connection successful')
})
connection.on('error', (error)=>{
    console.log(error)
})

const classRoutes = require('./routes/classRoutes')
const studentRoutes = require('./routes/studentRoute')
const parentRoutes = require('./routes/parentRoute')

app.use('/api/class/', classRoutes)
app.use('/api/student/', studentRoutes)
app.use('/api/parent/', parentRoutes)

app.listen(port, () => console.log(`App listening on port ${port}!`))