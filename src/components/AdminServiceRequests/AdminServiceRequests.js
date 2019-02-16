import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import {getRequests} from '../../ducks/reducer'
import axios from 'axios';

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


    render(){
        const requestMap = this.props.serviceRequests.map((e,i)=>{
            return(
                <div>
                    <p key={i}>{e.firstname} {e.lastname}</p>
                    <p key={i}>{e.comment}</p>
                    <p key={i}>{e.status}</p>
                    <button>Accept</button>
                    <button onClick={()=>this.deleteRequest(e.app_id)}>Delete</button>
                </div>
            )
        })

        // console.log(this.props.serviceRequests)
        return this.props.user.username && this.props.user.isAdmin === 'true' ? (
            <div>
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