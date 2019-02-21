import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUser, getRequests, getEmployees} from '../../ducks/reducer'
import axios from 'axios';
import Loader from 'react-loader-spinner'
import EmployeeList from '../EmployeeList/EmployeeList'

class AdminPortal extends Component{
    constructor(){
        super();
        this.state={
            toggleBtn: false,
            employeeFirstName: '',
            employeeLastName: ''
        }
    }

    async componentDidMount(){
        await this.props.getUser()
        this.props.getRequests()
        this.props.getEmployees()
    }

    toggleAddEmployee=()=>{
        this.setState({toggleBtn: !this.state.toggleBtn})
    }

    updateInput=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    addEmployee=(e)=>{
        const {employeeFirstName, employeeLastName} = this.state
        e.preventDefault()
        axios.post('api/addEmployee', {employeeFirstName, employeeLastName}).then(()=>{
            console.log('it worked')
            this.props.getEmployees()
        }).catch(err=>{
            console.log(err)
        })
        e.target.reset()
    }

    render(){
        console.log(this.state.user)

        const pendingRequests = this.props.serviceRequests.filter((e)=>{
            return e.status === 'Pending'
        })

        const acceptedRequests = this.props.serviceRequests.filter((e)=>{
            return e.status === 'Approved'
        })

        const deniedRequests = this.props.serviceRequests.filter((e)=>{
            return e.status === 'Denied'
        })

        return this.props.user.username && this.props.user.isAdmin === 'true' ? (
            <div>
                <button onClick={()=>this.toggleAddEmployee()}>Add Employee</button>
                {
                this.state.toggleBtn ? 
                    <div>
                        <form onSubmit={this.addEmployee}>
                            <input placeholder='Employee FirstName' name='employeeFirstName' onChange={this.updateInput}/>
                            <input placeholder='Employee LastName' name='employeeLastName' onChange={this.updateInput}/>
                            <button>Submit</button>
                        </form>
                    </div> : null
                }
                {/* <button onClick={()=>this.props.history.push('/portal/requests')}>Check Service Requests</button> */}
                <div>
                    <h2>Pending Requests: {pendingRequests.length}</h2>
                    <button onClick={()=>this.props.history.push('/portal/requests/')}>View Pending Requests</button>
                    <h2>Approved Requests: {acceptedRequests.length}</h2>
                    <button onClick={()=>this.props.history.push('/portal/requests/accepted')}>View Pending Requests</button>
                    <h2>Denied Requests: {deniedRequests.length}</h2>
                    <button onClick={()=>this.props.history.push('/portal/requests/denied')}>View Pending Requests</button>
                </div>
                <EmployeeList/>
            </div>
        ) : (
            <div>Admins Only</div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getUser, getRequests, getEmployees})(AdminPortal);