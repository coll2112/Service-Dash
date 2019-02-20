import React, {Component} from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'
import {connect} from 'react-redux'
import {loginChange, getUser, getUserInfo} from '../../ducks/reducer'
import './Register.scss'

class Register extends Component{
    constructor(){
        super();
        this.state={
            username:'',
            password:'',
            email: ''
        }
    }

    async componentDidMount(){
        await this.props.getUser()
        this.props.getUserInfo()
    }

    updateInput=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    registerUser=()=>{
        const {username, password, email} =  this.state
        axios.post('/api/register', {username, password, email}).then(()=>{
            this.props.getUser()
            this.props.history.push('/')
            // this.props.loginChange();
        }).catch((err)=>{
            console.log(err)
        })
    }

    render(){
        // console.log(this.state.email)
        return(
            <div className='login-container'>
                <div className='inputs'>
                    <p>Username:</p>
                    <input type='text' name='username' required autocomplete="off" onChange={this.updateInput}/>
                    <p>Email:</p>
                    <input type='' name='email' required autocomplete="off" onChange={this.updateInput}/>
                    <p>Password:</p>
                    <input type='' name='password' required autocomplete="off" onChange={this.updateInput}/>
                </div>
                <button onClick={()=>this.registerUser()}>Register</button>
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {loginChange, getUser, getUserInfo})(Register);