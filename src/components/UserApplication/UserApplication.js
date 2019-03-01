import React, {Component} from 'react'
import {getUser, getUserInfo, getRequests} from '../../ducks/reducer'
import { connect } from 'react-redux';
import UserInfoList from '../UserInfoList/UserInfoList'
import Redirect from '../Redirect/Redirect'
import axios from 'axios'
import './UserApplication.scss'

class UserApplication extends Component{
    constructor(){
        super();
        this.state={
            comment: '',
            appStatus: ''
        }
    }
    async componentDidMount(){
        await this.props.getUser();
        this.props.getUserInfo(this.props.user.id)
        this.props.getRequests();
    }

    // getAppStatus=()=>{
    //     const {id} = this.props.userInfo
    //     axios.get(`/api/appStatus/${id}`).then(response=>{
    //         console.log(response)
    //         this.setState({appStatus:response})
    //     }).catch(err=>{
    //         console.log(err)
    //     })
    // }

    updateInput=(e)=>{
        this.setState({comment:e.target.value})
    }

    submitApplication=(e)=>{
        const {comment} = this.state
        const {id} = this.props.user
        e.preventDefault();
        axios.post('/api/submitApplication', {id, comment, status:'Pending'}).then(response=>{
            this.props.getUserInfo(id);
            this.props.getUser();
        }).catch(err=>{
            console.log(err)
        })
        e.target.reset()
    }

    render(){
        // console.log(this.state.appStatus)
        return this.props.user.username ? (
            <div className='application-container'>
                <div className='app-content'>
                    <h3>Submit Service Request</h3>
                    <div className='userInfo'>
                        <p>
                            Your information and comments below will be submitted for approval. Please check and make sure
                            the information below is correct before submitting.
                        </p>
                        <h4>Your Information</h4>
                        <UserInfoList/>
                    </div>
                    <form onSubmit={this.submitApplication} className='appForm'>
                        <p>Please fill out the comment box below and let us know what we can assist with.</p>
                        <textarea rows='5' name='comment' onChange={this.updateInput}/>
                        <button>Submit Application</button>
                    </form>
                </div>
            </div>
        ) : (
            <div>
                <Redirect/>
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getUser, getUserInfo, getRequests})(UserApplication)