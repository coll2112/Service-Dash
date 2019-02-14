const getCustomers = (req, res) =>{
    const db = req.app.get('db')
    db.getAllCustomers().then(response=>{
        res.status(200).send(response)
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err)
    })
}

const getCustomer = (req, res) =>{
    const db =  req.app.get('db')
    const {id} = req.params

    db.getCustomer(id).then(response=>{
        res.status(200).send(response)
    }).catch(err=>{
        res.status(500).send({error: 'Failed'})
        console.log(err)
    })
}

const addUserInfo = (req, res) =>{
    const db = req.app.get('db')
    const {firstname, lastname, address, city, state, zip} = req.body
    const {id} = req.params

    db
    .addUserInfo([id, firstname, lastname, address, city, state, zip])
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
    getCustomer,
    addUserInfo
}