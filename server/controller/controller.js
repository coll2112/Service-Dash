const getCustomers = (req, res) =>{
    const db = req.app.get('db')
    db.getAllCustomers().then(response=>{
        res.status(200).send(response)
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err)
    })
}

const getOneCustomer = (req, res) =>{
    const db =  req.app.get('db')
    const {id} = req.body


}

module.exports={
    getCustomers,
    getOneCustomer
}