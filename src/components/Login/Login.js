import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {loginChange} from '../../ducks/reducer'
import axios from 'axios'

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
            <div>
                <p>Username:</p>
                <input type='text' name='username' onChange={this.updateInput}/>
                <p>Password:</p>
                <input type='password' name='password' onChange={this.updateInput}/>
                <button onClick={()=>this.submitLogin()}>Login</button>
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {loginChange})(Login);