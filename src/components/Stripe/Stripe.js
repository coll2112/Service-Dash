import React, { Component } from "react";
import { connect } from "react-redux";
import {getUser, getUserInfo, getRequests, getEmployees} from '../../ducks/reducer'
import StripeCheckout from 'react-stripe-checkout';
import {toast} from 'react-toastify';
import axios from "axios";

class Stripe extends Component{

    onToken = (token) => {
        const body = {
            amount: 4500,
            token: token
        }
        axios.put(`/api/pay/status/${this.props.id}`, { 
            is_paid:'true'
        }).then(()=>{
            this.successPayment()
            this.props.getRequests();
        }).catch(err=>{
            console.log(err)
            this.declinePayment();
        })
      }

    successPayment=()=>{
        toast.success('Payment Successful')
    }

    declinePayment=()=>{
        toast.error('Error with Payment')
    }

    // payBill=(id)=>{
    //     axios.put(`/api/pay/status/${id}`, {is_paid:'paid'}).then(()=>{
    //         this.successPayment()
    //     }).catch(err=>{
    //         console.log(err)
    //         this.declinePayment()
    //     })
    // }

    render(){
        return(
            <StripeCheckout
                amount="4500"
                description="Service Fee"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvA66pvMk1P4V0C5tV0LCwWJiq8OE275XtM1uO6570fMqdNPY8-w"
                locale="auto"
                name="Push.Co"
                stripeKey="pk_test_uQQGlSbLkSLVDm0D3X3RzYH6"
                token={this.onToken}
                label="Pay Service Fee"
            />
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getUser, getUserInfo, getRequests, getEmployees})(Stripe)