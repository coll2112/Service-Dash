import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {getRequests, getEmployees} from '../../ducks/reducer'
import axios from 'axios';
import Loader from 'react-loader-spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './AdminServiceRequests.scss'


class AdminServiceRequests extends Component{
    constructor(){
        super();
        this.state={
            toggle: true,
            selected: ''
        }
    }

    componentDidMount(){
        this.props.getRequests();
        this.props.getEmployees();
    }

    toggleBtn=(id)=>{
        this.setState({
            selected: id,
            toggle: !this.state.toggle 
        })
    }

    deleteRequest=(id)=>{
        axios.delete(`/api/remove/${id}`).then(()=>{
            // console.log('Item Deleted')
            this.props.getRequests();
        }).catch(err=>{
            console.log(err)
        })
    }

    assignJob=(employee_id, app_id)=>{
        // const {app_id} = this.props.serviceRequests
        console.log('howdy')
        axios.post(`/api/job/add`, {employee_id, app_id}).then(()=>{
            this.props.getEmployees()
        }).catch((err)=>console.log(err))
    }

    denyRequest=(id)=>{
        axios.post(`/api/status/${id}`, {status:'Denied'}).then(response=>{
            console.log('it worked!')
            this.props.getRequests()
        }).catch(err=>{
            console.log(err)
        })
    }

    render(){

        const acceptedRequests = this.props.serviceRequests.filter((e)=>{
            return e.status === 'Approved'
        })

        

        const acceptedMap = acceptedRequests.map((e,i)=>{
            var employeeMap = this.props.employees.map((f,j)=>{
                return <button className='employeeBtn' key={j} onClick={()=>this.assignJob(f.employee_id, e.app_id)}>{f.firstname} {f.lastname}</button>
            })
            return(
                <div key={i} className='requestMap'>
                    <h2>{e.firstname} {e.lastname}</h2>
                    <h3 className='userComments'>Request:</h3>
                    <p>{e.comment}</p>
                    <h3 className='appStatus'>Application Status: {e.status}</h3>
                    <div className='requestBtns'>
                        <div className='dropdown' >
                            <button onClick={()=>this.toggleBtn(e.app_id)}>
                                <span className='arrow-down'>Assign Job <FontAwesomeIcon icon='sort-down' size='1x' style={{color:'#f1f1f1'}}/></span>
                            </button>
                            {this.state.toggle && this.state.selected === e.app_id ? 
                                <div className='dropdown-content'>
                                    {employeeMap}
                                </div> : 
                                null}
                        </div>
                        <button onClick={()=>this.denyRequest(e.app_id)}>Deny</button>
                        <button onClick={()=>this.deleteRequest(e.app_id)}>Delete</button>
                    </div>
                </div>
            );
        })

        return this.props.user.username && this.props.user.isAdmin === 'true' ? (
             this.props.isLoading ? 
                <div className="spinner">
                    <Loader Loader type="Oval" color="#7C90A0" height={100} width={100}/>
                </div>
                    :
                <div className='requestList'>
                    <div className='filterBtns'>
                        <h3>Filter Requests</h3>
                        <NavLink to='/portal/requests/accepted'><button>Accepted Requests</button></NavLink>
                        <NavLink to='/portal/requests'><button>Pending Requests</button></NavLink>
                        <NavLink to='/portal/requests/denied'><button>Denied Requests</button></NavLink>
                    </div>
                    <div>
                        <h2 className='title'>Accepted Requests</h2>
                        {acceptedMap}
                    </div>
                </div>
        ) : (
            <div>
                Admins Only
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getRequests, getEmployees})(AdminServiceRequests)