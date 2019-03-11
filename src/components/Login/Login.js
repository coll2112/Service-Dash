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
            err: false,
            clicked: false,
            className:'login-container animated fadeInDownBig'
        }
    }

    updateInput=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    submitLogin=(e)=>{
        e.preventDefault()
        const {username, password} = this.state
        // const {login} = this.props
        axios.post('api/login', {username, password}).then(()=>{
            this.props.getUser()
            this.props.history.push('/')
        }).catch((err)=>{
            console.log(err)
            this.setState({
                err: true,
                className:'login-container animated headShake'
            })
        })
    }



    render(){
        return(
            <div className='login-page-container'>
                <div className={this.state.className}>
                    <div>
                        <form className='inputs' onSubmit={this.submitLogin}>
                            <p>Username:</p>
                            <input type='text' name='username' required onChange={this.updateInput}/>
                            <p>Password:</p>
                            <input type='password' name='password' required onChange={this.updateInput}/>
                            <button>Login</button>
                        </form>
                    </div>
                    {this.state.err ? <p  style={{color:'red', textAlign: 'center'}}>Username or Password Incorrect</p> : null}
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {loginChange, getUser, getUserInfo})(Login);