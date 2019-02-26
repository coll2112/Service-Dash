

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

    db.getCustomer(id)
    .then(response=>{
        res.status(200).send(response)
    })
    .catch(err=>{
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

addEmployee=(req, res)=>{
    const db = req.app.get('db')
    const {employeeFirstName, employeeLastName} = req.body

    db.addEmployee([employeeFirstName, employeeLastName])
    .then(response=>{
        res.status(200).send(response)
    })
    .catch(err=>{
        res.status(500).send({error:'Failed'})
        console.log(err)
    })
}

const removeEmployee=(req,res)=>{
    const db = req.app.get('db')
    // const {id} = req.params
    // console.log('hitt')

    db.deleteEmployee(req.params.id).then(()=>{
        res.status(200).send('Employee removed')
    }).catch(err=>{
        console.log(err)
        res.status(500).send({error:'Failed to Remove Employee'})
    })
}

getAllRequests = (req, res)=>{
    const db = req.app.get('db')
    // console.log('hit')
    db.getAllRequests().then(response=>{
        // console.log(response)
        res.status(200).send(response)
    }).catch(err=>{
        console.log(err)
        res.status(500).send({error: "Failed"})
    })
}

submitApp = (req, res) =>{
    const db = req.app.get('db')
    const {id, comment, status} = req.body

    db.submitApp([id, comment, status]).then(response=>{
        res.status(200).send(response)
    }).catch(err=>{
        console.log(err)
        res.status(500).send({error: 'Failed'})
    })
}

getAppStatus = (req,res) =>{
    const db = req.app.get('db')

    db.getAppStatus(req.params.id).then(response=>{
        res.status(200).send(response)
    }).catch(err=>{
        console.log(err)
        res.status(500).send({error: 'Failed'})
    })
}

deleteRequest=(req, res)=>{
    const db = req.app.get('db')

    db.deleteRequests(req.params.id).then(response=>{
        // console.log('hit')
        res.status(200).send('Item Deleted')
    }).catch(err=>{
        console.log(err)
        res.status(500).send({error: 'Failed'})
    })
}

statusRequest = (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    const {status} = req.body

    db.updateRequest([id, status]).then(response=>{
        res.status(200).send(response)
    }).catch(err=>{
        console.log(err)
        res.status(500).send({error: 'Failed to post'})
    })
}

getEmployees=(req,res)=>{
    const db = req.app.get('db')

    db.getAllEmployees().then(response=>{
        res.status(200).send(response)
    }).catch(err=>{
        console.log(err)
        res.status(500).send({error: 'Failed to get employee data'})
    })
}

assignJob=(req,res)=>{
    const db = req.app.get('db')
    const {app_id, employee_id} = req.body

    db.addJob([app_id, employee_id]).then(response=>{
        res.status(200).send(response)
    }).catch(err=>{
        console.log(err)
        res.status(500).send({error: 'Failed to Assign Job'})
    })
}

module.exports={
    getCustomers,
    getCustomer,
    addUserInfo,
    addEmployee,
    getAllRequests,
    submitApp,
    getAppStatus,
    deleteRequest,
    statusRequest,
    getEmployees,
    removeEmployee,
    assignJob
}