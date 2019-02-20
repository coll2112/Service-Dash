const bcrypt = require('bcryptjs')

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

    try{
        const response = await db.addUser({
            username: req.body.username,
            password: hash,
            admin: req.body.admin,
            email: req.body.email
        })
        req.session.user={username: response[0].username, id: response[0].id}
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