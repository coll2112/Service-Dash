import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import {getRequests} from '../../ducks/reducer'
import axios from 'axios';
import Loader from 'react-loader-spinner'
import './AdminServiceRequests.scss'

class AdminServiceRequests extends Component{

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

    render(){
        const requestMap = this.props.serviceRequests.map((e,i)=>{
            return(
                <div key={i} className='requestMap'>
                    <h2>{e.firstname} {e.lastname}</h2>
                    <h3 className='userComments'>Comments:</h3>
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

        // console.log(this.props.serviceRequests)
        return this.props.user.username && this.props.user.isAdmin === 'true' ? (
             this.props.isLoading ? 
                <div className="spinner">
                    <Loader Loader type="Oval" color="#7C90A0" height={100} width={100}/>
                </div>
                    :
                <div className='requestList'>
                    {/* <div className='requestHeader'>Applications</div> */}
                    {requestMap}
                </div>
        ) : (
            <div>
                Admins Only
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getRequests})(AdminServiceRequests)