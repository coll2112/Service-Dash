import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loginChange, getUser, getUserInfo} from '../../ducks/reducer'
import axios from 'axios'
import './Login.scss'

class Login extends Component{
    constructor(){
        super();
        this.state={
            username:'',
            password:'',
            err: false
        }
    }

    // async componentDidMount(){
    //     await this.props.getUser()
    // }

    updateInput=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

   submitLogin=()=>{
        const {username, password} = this.state
        // const {login} = this.props
        axios.post('api/login', {username, password}).then(()=>{
            this.props.getUser()
            this.props.history.push('/')
        }).catch((err)=>{
            console.log(err)
            this.setState({err: true})
        })
    }

    render(){
        console.log(this.props.userInfo[0])
        return(
            <div className='login-container'>
                <div className='inputs'>
                    <p>Username:</p>
                    <input type='text' name='username' onChange={this.updateInput}/>
                    <p>Password:</p>
                    <input type='password' name='password' onChange={this.updateInput}/>
                </div>
                {this.state.err ? <p  style={{color:'red', textAlign: 'center'}}>Username or Password Incorrect</p> : null}
                <button onClick={()=>this.submitLogin()}>Login</button>
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {loginChange, getUser, getUserInfo})(Login);