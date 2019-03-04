require('dotenv').config()
const express = require('express')
const {json} = require('body-parser')
const massive = require('massive')
const session =  require('express-session')
const stripe = require('stripe')(process.env.STRIPE_SECRET)
const path = require('path');
const {
    getCustomers, 
    addUserInfo, 
    getCustomer, 
    addEmployee, 
    getAllRequests, 
    submitApp, 
    getAppStatus, 
    deleteRequest,
    getEmployees,
    removeEmployee,
    assignJob,
    payStatus
    } =  require('./controller/controller')
const {login, 
       register, 
       logout, 
       userSession} =  require('./controller/authcontroller')

const app=express()
app.use(json())

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))

massive(process.env.CONNECTION_STRING).then(db=>{
    app.set('db', db)
    console.log('Database Connected')
})

async function payment(){
    let charge = await stripe.charges.create({
        amount: 4500,
        currency: 'usd',
        source: 'tok_visa',
    })
}

// Pay with Stripe
app.post('/api/pay', payment)
app.put('/api/pay/status', payStatus)

//user
app.get('/api/customers', getCustomers)
app.get('/api/customers/:id', getCustomer)
app.get('/api/appStatus/:id', getAppStatus)
app.put('/api/editUserInfo/:id', addUserInfo)
app.post('/api/submitApplication', submitApp)

//employee
app.get('/api/requests', getAllRequests)
app.get('/api/employees', getEmployees)
app.post('/api/addEmployee', addEmployee)
app.post('/api/status/:id', statusRequest)
app.delete('/api/remove/:id', deleteRequest)
app.delete('/api/employee/remove/:id', removeEmployee)
app.post('/api/job/add', assignJob)

//User login, logout, session and register
app.get('/api/user', userSession)
app.post('/api/login', login)
app.post('/api/register', register,)
app.get('/api/logout', logout)


app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

const port = process.env.SERVER_PORT
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})