import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {getRequests} from '../../ducks/reducer'
import axios from 'axios';
import Loader from 'react-loader-spinner'
import Redirect from '../Redirect/Redirect'
import './AdminServiceRequests.scss'

class AdminServiceRequests extends Component{

    constructor(){
        super();
        this.state={
            togglePending: false,
            btnText: 'Pending Requests'
        }
    }

    componentDidMount(){
        this.props.getRequests()
    }

    deleteRequest=(id)=>{
        axios.delete(`/api/remove/${id}`).then(()=>{
            // console.log('Item Deleted')
            this.props.getRequests();
        }).catch(err=>{
            console.log(err)
        })
    }

    acceptRequest=(id)=>{
        axios.post(`/api/status/${id}`, {status:'Approved'}).then(response=>{
            console.log('It worked!')
            this.props.getRequests()
        }).catch(err=>{
            console.log(err)
        })
    }

    denyRequest=(id)=>{
        axios.post(`/api/status/${id}`, {status:'Denied'}).then(response=>{
            console.log('it worked!')
            this.props.getRequests()
        }).catch(err=>{
            console.log(err)
        })
    }

    checkPending=()=>{
        this.props.getRequests();
        // if(this.state.togglePending){
        //     this.setState({btnText:'Pending Requests'})
        // }else{
        //     this.setState({
        //         btnText:'All Requests',
        //         togglePending: false
        //     })
        // }
    }

    render(){
        const pendingRequests = this.props.serviceRequests.filter((e)=>{
            return e.status === 'Pending'
        })

        const pendingMap = pendingRequests.map((e,i)=>{
            return(
                <div key={i} className='requestMap'>
                    <h2>{e.firstname} {e.lastname}</h2>
                    <h3 className='userComments'>Request:</h3>
                    <p>{e.comment}</p>
                    <h3 className='appStatus'>Application Status: {e.status}</h3>
                    <div className='requestBtns'>
                        <button onClick={()=>this.acceptRequest(e.app_id)}>Accept</button>
                        <button onClick={()=>this.denyRequest(e.app_id)}>Deny</button>
                        <button onClick={()=>this.deleteRequest(e.app_id)}>Delete</button>
                    </div>
                </div>
            )
        })

        return this.props.user.username && this.props.user.isAdmin === 'true' ? (
             this.props.isLoading ? 
                <div className="spinner">
                    <Loader type="Oval" color="#7C90A0" height={100} width={100}/>
                </div>
                    :
                <div className='requestList'>
                    <div className='filterBtns'>
                        <h3>Filter Requests</h3>
                        <NavLink to='/portal/requests/accepted'><button>Accepted Requests</button></NavLink>
                        <button onClick={()=>this.checkPending()}>Pending Requests</button>
                        <NavLink to='/portal/requests/denied'><button>Denied Requests</button></NavLink>
                    </div>
                    <div className='mapContainer'>
                        <h2>Pending Requests</h2>
                        {!pendingRequests[0] ? <h2>There are currently no pending requests</h2> : pendingMap}
                    </div>
                </div>
        ) : (
            <div>
                <Redirect/>
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getRequests})(AdminServiceRequests)