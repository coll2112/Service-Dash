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
                <p>Welcome {this.props.user.username}</p>
                <NavLink to='/dashboard/account'><button>Account Information</button></NavLink>
                <NavLink to='/dashboard/application'><button>Service Application</button></NavLink>
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