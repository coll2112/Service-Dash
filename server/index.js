require('dotenv').config()
const express = require('express')
const {json} = require('body-parser')
const massive = require('massive')
const session =  require('express-session')
const {getCustomers, addUserInfo} =  require('./controller/controller')
const {login, register, logout, userSession} =  require('./controller/authcontroller')

const app=express()
app.use(json())

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))

massive(process.env.CONNECTION_STRING).then(db=>{
    app.set('db', db)
    console.log('Database Connected')
})


app.get('/api/customers', getCustomers)
app.post('/api/addinfo', addUserInfo)
// app.get('/api/customer/:id', getOneCustomer)

//User login, logout, session and register
app.get('/api/user', userSession)
app.post('/api/login', login)
app.post('/api/register', register)
app.post('/api/logout', logout)

const port = process.env.SERVER_PORT
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})