import React, {Component} from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'
import {connect} from 'react-redux'
import {loginChange, getUser} from '../../ducks/reducer'
import './Register.scss'

class Register extends Component{
    constructor(){
        super();
        this.state={
            username:'',
            password:''
        }
    }

    componentDidMount(){
        this.props.getUser()
    }

    updateInput=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    registerUser=()=>{
        const {username, password} =  this.state
        axios.post('/api/register', {username, password}).then(response=>{
            this.props.history.push('/')
            this.props.loginChange();
            this.props.getUser()
        }).catch((err)=>{
            console.log(err)
        })
    }

    render(){
        // console.log(this.state.password)
        return(
            <div className='login-container'>
                <div className='inputs'>
                    <p>Username:</p>
                    <input type='text' name='username' onChange={this.updateInput}/>
                    <p>Password:</p>
                    <input type='password' name='password' onChange={this.updateInput}/>
                </div>
                <button onClick={()=>this.registerUser()}>Register</button>
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {loginChange, getUser})(Register);