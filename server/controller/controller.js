const getCustomers = (req, res) =>{
    const db = req.app.get('db')
    db.getAllCustomers().then(response=>{
        res.status(200).send(response)
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err)
    })
}

// const getOneCustomer = (req, res) =>{
//     const db =  req.app.get('db')
//     const {id} = req.body
// }

const addUserInfo = async (req, res) =>{
    const db = req.app.get('db')
    const {firstname, lastname, address, city, state, zip} = req.body
        
    db
    .addUserInfo([firstname, lastname, address, city, state, zip])
    .then(response=>{
        res.status(200).send(response)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).send({error:'Failed'})
    })
            
}

module.exports={
    getCustomers,
    addUserInfo
}