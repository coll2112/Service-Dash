import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loginChange} from '../../ducks/reducer'
import axios from 'axios'
import './Login.css'

class Login extends Component{
    constructor(){
        super();
        this.state={
            username:'',
            password:''
        }
    }

    updateInput=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    submitLogin=()=>{
        const {username, password} = this.state
        // const {login} = this.props
        axios.post('api/login', {username, password}).then(response=>{
            this.props.history.push('/account')
            this.props.loginChange()
        }).catch((err)=>{
            console.log(err)
        })
    }

    render(){
        console.log(this.props.login)
        return(
            <div className='login-container'>
                <div className='inputs'>
                    <p>Username:</p>
                    <input type='text' name='username' onChange={this.updateInput}/>
                    <p>Password:</p>
                    <input type='password' name='password' onChange={this.updateInput}/>
                </div>
                <button onClick={()=>this.submitLogin()}>Login</button>
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {loginChange})(Login);