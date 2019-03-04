import React, { Component } from "react";
import { connect } from "react-redux";
import {getUser, getUserInfo, getRequests, getEmployees} from '../../ducks/reducer'
import Redirect from '../Redirect/Redirect'
import './SentApplication.scss'
import Loader from 'react-loader-spinner'
import Stripe from '../Stripe/Stripe'

class SentApplication extends Component{

    async componentDidMount(){
        await this.props.getUser();
        this.props.getUserInfo(this.props.user.id);
        await this.props.getRequests();
        this.props.getEmployees();
    }

    render(){
        const approvedApp = this.props.serviceRequests.filter((e)=>{
            return e.status === 'Approved' && e.id == this.props.userInfo[0].id
        })

        const approvedMap =  approvedApp.map((e,i)=>{
            return(
                <div key={i} className='sentMap'>
                    <h3 className='userComments'>Request:</h3>
                    <p>{e.comment}</p>
                    <h3 className='appStatus'>Application Status: {e.status}</h3>
                    <div className='stripe-checkout'>
                        {e.is_paid===null ? <Stripe id={e.app_id}/> : null}
                        <h4>Service Fee: {e.is_paid === null ? "$45" : 'Paid'}</h4>
                    </div>
                </div>
            )
        })

        return this.props.user.username ? (
            this.props.userInfo[0] ? 
                <div className='subApp-container'>
                    <div>
                        {approvedMap}
                    </div>
                </div> 
                : 
                <div className="spinner">
                    <Loader Loader type="Oval" color="#7C90A0" height={100} width={100}/>
                </div>
        ) : (
            <Redirect/>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getUser, getUserInfo, getRequests, getEmployees})(SentApplication)