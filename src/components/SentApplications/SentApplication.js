import React, { Component } from "react";
import { connect } from "react-redux";
import {getUser, getUserInfo, getRequests, getEmployees} from '../../ducks/reducer'
import StripeCheckout from 'react-stripe-checkout';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import {NavLink} from 'react-router-dom'
// import Redirect from '../Redirect/Redirect'
import './SentApplication.scss'
import axios from "axios";

class SentApplication extends Component{

    async componentDidMount(){
        await this.props.getUser();
        this.props.getUserInfo(this.props.user.id);
        this.props.getRequests();
        this.props.getEmployees();
    }

    // onToken = token => {
    //     const body = {
    //         amount: 4500,
    //         token: token
    //     }
    //     axios
    //     .post('/api/pay', body).then(() => {
    //         console.log('Payment Went Through')
    //         alert(`Payment Sucessful`);
    //       }).catch(err=>{
    //           console.log('error')
    //       })
    //   }

    successPayment=()=>{
        toast.success('Payment Successful')
    }

    onToken = (token) =>{
        const {id} = this.props.getUser
        axios.post(`/api/pay/${id}`,
        {
            token: token,
            amount: '4500',
            isPaid: 'True'
        })
        .then(this.payment())
        .catch(console.log);
    }

    payment=()=>{
        const {app_id} = this.props.serviceRequests
        axios.put(`/api/pay/status`, {
            app_id, 
            is_paid:'true'
        }).then(()=>{
            this.successPayment()
        }).catch(err=>{
            console.log(err)
        })
    }

    // payment=()=>{
    //     const {app_id} = this.props.serviceRequests
    //     axios.put(`/api/pay/status`, {})
    // }

    render(){
        const approvedApp = this.props.serviceRequests.filter((e)=>{
            return e.status === 'Approved' && e.id == this.props.userInfo[0].id
        })

        const approvedMap =  approvedApp.map((e,i)=>{
            // var employeeMap = this.props.employees.map((f,j)=>{
            //     return <p>{f.firstname} {f.lastname}</p> 
            // })

            return(
                <div key={i} className='sentMap'>
                    {/* <h2>{e.firstname} {e.lastname}</h2> */}
                    <h3 className='userComments'>Request:</h3>
                    <p>{e.comment}</p>
                    <h3 className='appStatus'>Application Status: {e.status}</h3>
                    <div className='stripe-checkout'>
                        <StripeCheckout
                            amount="4500"
                            description="Service Fee"
                            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvA66pvMk1P4V0C5tV0LCwWJiq8OE275XtM1uO6570fMqdNPY8-w"
                            locale="auto"
                            name="Push.Co"
                            stripeKey="pk_test_uQQGlSbLkSLVDm0D3X3RzYH6"
                            token={this.onToken}
                            label="Pay Service Fee"
                            // zipCode
                        />
                        <h4>Service Fee: $45</h4>
                        <ToastContainer/>
                    </div>
                </div>
            )
        })

        return(
            <div className='subApp-container'>
                <div>
                    {approvedMap}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getUser, getUserInfo, getRequests, getEmployees})(SentApplication)