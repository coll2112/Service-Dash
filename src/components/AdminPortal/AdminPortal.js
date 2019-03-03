import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUser, getRequests, getEmployees} from '../../ducks/reducer'
import axios from 'axios';
import EmployeeList from '../EmployeeList/EmployeeList'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
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
                <div className='portal-content'>
                    <div className='requestPortal'>
                        {/* <h2>Pending: <span className='pendingNum'>{pendingRequests.length}</span></h2> */}
                        <button onClick={()=>this.props.history.push('/portal/requests/')}>Pending Requests: {pendingRequests.length} <FontAwesomeIcon icon='angle-right' size='1x'/></button>
                        {/* <h2>Approved: <span className='approvedNum'>{acceptedRequests.length}</span></h2> */}
                        <button onClick={()=>this.props.history.push('/portal/requests/accepted')}>Approved Requests: {acceptedRequests.length} <FontAwesomeIcon icon='angle-right' size='1x'/></button>
                        {/* <h2>Denied: <span className='deniedNum'>{deniedRequests.length}</span></h2> */}
                        <button onClick={()=>this.props.history.push('/portal/requests/denied')}>Denied Requests: {deniedRequests.length} <FontAwesomeIcon icon='angle-right' size='1x'/></button>
                    </div>
                    <div className='employeeContainer'>
                        <div className='addEmployee'>
                            <div className='employeeForm'>
                                <div className='formHeader'>Add Employee</div>
                                <form onSubmit={this.addEmployee}>
                                    <input placeholder='Employee First Name' name='employeeFirstName' required onChange={this.updateInput}/>
                                    <input placeholder='Employee Last Name' name='employeeLastName' required onChange={this.updateInput}/>
                                    <button className='formSubmitBtn'>Submit</button>
                                </form>
                            </div>
                        </div>
                        <div className='listContainer'>
                            <EmployeeList/>
                        </div>
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