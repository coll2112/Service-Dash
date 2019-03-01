import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUser, getUserInfo} from '../../ducks/reducer'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import Redirect from '../Redirect/Redirect'
import './UserAccount.scss'

class UserAccount extends Component{
    constructor(){
        super();
        this.state={
            firstname:'',
            lastname:'',
            address:'',
            city:'',
            state:'',
            zip:''
        }
    }

    async componentDidMount(){
        await this.props.getUser();
        this.props.getUserInfo(this.props.user.id);
    }

    updateInput=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    submitInfo=(e)=>{
        const {firstname, lastname, address, city, state, zip} = this.state
        const {id} = this.props.user
        e.preventDefault();
        axios.put(`/api/editUserInfo/${id}`, {firstname, lastname, address, city, state, zip}).then(()=>{
            this.props.getUserInfo(this.props.user.id)
            this.props.history.push('/dashboard')
            toast.success('Account Info Updated')
        }).catch(err=>{
            console.log(err)
        })
        e.target.reset()
    }

    render(){
        // if(this.props.userInfo[0]){
        //     console.log(this.props.userInfo[0])
        // }

        // console.log(this.props.user)
        
        return this.props.user.username && this.props.userInfo[0] ? (
             <div className='account-container'>
                <form onSubmit={this.submitInfo} className='infoForm fadeInDownBig animated'>
                    <h2>Update Your Account</h2>
                    <p>First Name:</p>
                    <input type='text' name='firstname' required  required onChange={this.updateInput}/>
                    <p>Last Name:</p>
                    <input type='text' name='lastname' required onChange={this.updateInput}/>
                    <p>Address:</p>
                    <input type='text' name='address' required onChange={this.updateInput}/>
                    <p>City:</p>
                    <input type='text' name='city' required onChange={this.updateInput}/>
                    <p>State:</p>
                    <input type='text' name='state' required onChange={this.updateInput}/>
                    <p>ZipCode:</p>
                    <input type='number' name='zip' required onChange={this.updateInput}/>
                    <button type='submit'>Submit</button>
                </form>
            </div> 
        ) : (
            <div>
                {/* <Redirect/> */}
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getUser, getUserInfo})(UserAccount)