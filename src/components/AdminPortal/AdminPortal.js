import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUser, getRequests, getEmployees} from '../../ducks/reducer'
import axios from 'axios';
import EmployeeList from '../EmployeeList/EmployeeList'
import Redirect from '../Redirect/Redirect'
import './AdminPortal.scss'

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
            <div className='adminPortalContainer'>
                <div className='requestPortal'>
                    <div className='requestsLength'>
                        {/* <h2>Pending: <span className='pendingNum'>{pendingRequests.length}</span></h2> */}
                        <button onClick={()=>this.props.history.push('/portal/requests/')}>Pending Requests: {pendingRequests.length}</button>
                    </div>
                    <div className='requestsLength'>
                        {/* <h2>Approved: <span className='approvedNum'>{acceptedRequests.length}</span></h2> */}
                        <button onClick={()=>this.props.history.push('/portal/requests/accepted')}>Approved Requests: {acceptedRequests.length}</button>
                    </div>
                    <div className='requestsLength'>
                        {/* <h2>Denied: <span className='deniedNum'>{deniedRequests.length}</span></h2> */}
                        <button onClick={()=>this.props.history.push('/portal/requests/denied')}>Denied Requests: {deniedRequests.length}</button>
                    </div>
                </div>
                <div className='employeeContainer'>
                    <div className='formContainer'>
                        <div className='employeeForm'>
                            <div className='formHeader'>Add Employee</div>
                            <form onSubmit={this.addEmployee}>
                                <p>First Name</p>
                                <input placeholder='Employee First Name' name='employeeFirstName' onChange={this.updateInput}/>
                                <p>Last Name</p>
                                <input placeholder='Employee Last Name' name='employeeLastName' onChange={this.updateInput}/>
                                <button className='formSubmitBtn'>Submit</button>
                            </form>
                        </div>
                    </div>
                    <div className='listContainer'>
                        <EmployeeList/>
                    </div>
                </div>
            </div>
        ) : (
            <Redirect/>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getUser, getRequests, getEmployees})(AdminPortal);