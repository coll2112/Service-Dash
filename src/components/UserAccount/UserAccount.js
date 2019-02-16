import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUser, getUserInfo} from '../../ducks/reducer'
import axios from 'axios'
import UserInfoList from '../UserInfoList/UserInfoList'
import {Link} from 'react-router-dom'
import routes from '../../routes'
// import Dashboard from '../Dashboard/Dashboard'

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
        }).catch(err=>{
            console.log(err)
        })
        e.target.reset()
    }

    render(){
        if(this.props.userInfo[0]){
            console.log(this.props.userInfo[0])
        }

        console.log(this.props.user)
        
        return this.props.user.username && this.props.userInfo[0] ? (
            <div>
                <Link to='/dashboard/application'>Service Application</Link>
                <p>Hello, {this.props.userInfo[0].firstname}</p>
                <p>User Info Here</p>
                <form onSubmit={this.submitInfo} className='infoForm'>
                    <p>First Name:</p>
                    <input type='text' name='firstname' onChange={this.updateInput}/>
                    <p>Last Name:</p>
                    <input type='text' name='lastname' onChange={this.updateInput}/>
                    <p>Address:</p>
                    <input type='text' name='address' onChange={this.updateInput}/>
                    <p>City:</p>
                    <input type='text' name='city' onChange={this.updateInput}/>
                    <p>State:</p>
                    <input type='text' name='state' onChange={this.updateInput}/>
                    <p>ZipCode:</p>
                    <input type='number' name='zip' onChange={this.updateInput}/>
                    <button>Submit</button>
                </form>
                <UserInfoList/>
                {/* <button onClick={()=>this.submitInfo()}>Submit</button> */}
                {/* <p>{this.props.userInfo}</p> */}
            </div>
        ) : (
            <div>
                Please Log In
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getUser, getUserInfo})(UserAccount)