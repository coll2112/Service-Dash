import React, { Component } from "react";
import { connect } from "react-redux";
import {getUser, getUserInfo} from '../../ducks/reducer'
import {NavLink} from 'react-router-dom'
import Redirect from '../Redirect/Redirect'
import UserInfoList from '../UserInfoList/UserInfoList'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './Dashboard.scss'
import Loader from 'react-loader-spinner'
import { toast } from "react-toastify";

class Dashboard extends Component{
    async componentDidMount(){
        await this.props.getUser();
        this.props.getUserInfo(this.props.user.id);
    }

    render(){
        return this.props.user.username ? (
            this.props.userInfo[0] ? 
            <div className='dashboard-container'>
                <p className='title-head'>Hello {this.props.userInfo[0].firstname}</p>
                <div className='dashboard-content'>
                    <div className='ua-box animated fadeInLeft'>
                        <h3>Account Information</h3>
                        <UserInfoList/>
                        <NavLink to='/dashboard/account'><button>Edit Your Information</button></NavLink>
                    </div>
                    <div className='dashboard-btns animated fadeInRight'>
                        <button onClick={()=>this.props.history.push('/dashboard/application')}>Submit Service Application <FontAwesomeIcon icon='angle-right' size='1x'/></button>
                        <button onClick={()=>this.props.history.push('/dashboard/application/submitted')}>Check Status of Application <FontAwesomeIcon icon='angle-right' size='1x'/></button>
                    </div>
                </div> 
            </div>
            :
            <div>
                <Loader Loader type="Oval" color="#7C90A0" height={100} width={100}/>
            </div>
        ) : (
            <div>
                <Redirect/>
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getUser, getUserInfo})(Dashboard)