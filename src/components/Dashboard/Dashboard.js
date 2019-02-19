import React, { Component } from "react";
import { connect } from "react-redux";
import {getUser, getUserInfo} from '../../ducks/reducer'
import {Link, NavLink} from 'react-router-dom'

class Dashboard extends Component{
    componentDidMount(){
        this.props.getUser();
    }

    render(){
        return this.props.user.username ? (
            <div>
                <NavLink to='/dashboard/account'>Account Information</NavLink>
                <p>Welcome {this.props.user.username}</p>
            </div>
        ) : (
            <div>
                <h2>Please Sign In</h2>
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getUser, getUserInfo})(Dashboard)