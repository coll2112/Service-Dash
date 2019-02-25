require('dotenv').config()
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

// const htmlBody = "PushCo is a fictional site developed by Lee Collins. PushCo was built to demonstrate the ability to develop web apps with React, Node, SQL, and other technologies."

// Template MailOptions Config

// const mailOptions = {
//     from: 'no-reply@Push.Co',
//     to: email,
//     subject: 'Welcome to PushCo!',
//     text: 'Thanks for choosing PushCo. Please be sure to update your account info to accurate user info.',
//     html: '<p>Thanks for choosing PushCo. Please be sure to update your account info to accurate user info.</p>'
// }

const login = (req, res) =>{
    const db = req.app.get('db')

    db.findCustomer(req.body.username).then(async result=>{
        // console.log(result, req.session)
        if(!result.length){
            res.status(401).json({error: 'No user found'})
        }else{
            const isMatch =  await bcrypt.compare(req.body.password, result[0].password)
            if(isMatch){
                req.session.user={username: result[0].username, id: result[0].id, isAdmin: result[0].admin}
                res.json(req.session.user)
            }else{
                res.status(401).json({error: 'Incorrect Password'})
            }
        }
    })
}

const register = async (req, res)=>{
    const db = req.app.get('db')
    const hash = await bcrypt.hash(req.body.password, 10)
    const mailOptions = {
        from: '"PushCo Creator" <PortfolioEmailTest@gmail.com>',
        to: req.body.email,
        subject: 'Welcome to PushCo!',
        text: "Thanks for choosing PushCo. Please be sure to update your account info when logging in for the first time. We thank you for choosing PushCo!",
        html: `<p>Hello, ${req.body.username}. Thanks for choosing PushCo. Please be sure to update your account info when logging in for the first time. We thank you for choosing PushCo!</p>`
    }

    try{
        const response = await db.addUser({
            username: req.body.username,
            password: hash,
            admin: req.body.admin,
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip
        })
        req.session.user={username: response[0].username, id: response[0].id}
        transporter.sendMail(mailOptions)
        res.json(req.session.user)
    }catch(err){
        console.log(err)
        res.status(401).json('There is an error')
    }
}

const logout = (req, res) =>{
    req.session.destroy();
    res.status(200).json('Success Logged Out')
}

const userSession = (req, res)=>{
    if(req.session.user){
        console.log(req.session)
        res.json(req.session.user)
    }else{
        res.status(401).json({error: 'Please log in'})
    }
}

module.exports={
    login,
    register,
    logout,
    userSession
}