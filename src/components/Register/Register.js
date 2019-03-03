import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {loginChange, getUser, getUserInfo} from '../../ducks/reducer'
import './Register.scss'

class Register extends Component{
    constructor(){
        super();
        this.state={
            toggleForm: false,
            firstname:'',
            lastname:'',
            address:'',
            city:'',
            state:'',
            zip:'',
            username: '',
            email:'',
            password:''
        }
    }

    componentDidMount(){
        this.props.getUser()
        this.props.getUserInfo()
    }

    updateInput=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    registerUser=()=>{
        const {username, password, email, firstname, lastname, address, city, state, zip} =  this.state
        axios.post('/api/register', {
            username, 
            password, 
            email, 
            firstname, 
            lastname, 
            address, 
            city, 
            state, 
            zip
        }).then(()=>{
            this.props.getUser()
            this.props.history.push('/')
        }).catch((err)=>{
            console.log(err)
        })
    }

    

    render(){
        console.log(this.state.username)
        const {username, password, email, firstname, lastname, address, city, state, zip} =  this.state
        return(
            <div className='login-page-container'>
                <div className='login-container fadeInDownBig animated'>
                {this.state.toggleForm ? 
                    <div className='inputs'>
                        <p>Username:</p>
                        <input type='text' name='username' value={username} required onChange={this.updateInput}/>
                        <p>Email:</p>
                        <input type='email' name='email' value={email} required onChange={this.updateInput}/>
                        <p>Password:</p>
                        <input type='password' name='password' value={password} required onChange={this.updateInput}/>
                        <button onClick={()=>this.setState({toggleForm:!this.state.toggleForm})}>Back</button>
                        <button onClick={()=>this.registerUser()}>Register</button>
                    </div>
                    :
                    <div className='inputs'>
                        <p>First Name:</p>
                        <input type='text' name='firstname' value={firstname} required onChange={this.updateInput}/>
                        <p>Last Name:</p>
                        <input type='text' name='lastname' value={lastname} required onChange={this.updateInput}/>
                        <p>Address:</p>
                        <input type='text' name='address'value={address} required onChange={this.updateInput}/>
                        <p>City:</p>
                        <input type='text' name='city' value={city} required onChange={this.updateInput}/>
                        <p>State:</p>
                        <input type='text' name='state' value={state} required onChange={this.updateInput}/>
                        <p>Zip:</p>
                        <input type='number' name='zip' value={zip} equired onChange={this.updateInput}/>
                        <button onClick={()=>this.setState({toggleForm:!this.state.toggleForm})}>Next</button>
                    </div>
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {loginChange, getUser, getUserInfo})(Register);