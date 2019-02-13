import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUser} from '../../ducks/reducer'
import {Link} from 'react-router-dom'
import axios from 'axios'

class UserAccount extends Component{

    componentDidMount(){
        this.props.getUser()
    }

    addData=()=>{

    }

    render(){
        // console.log(this.props.user)
        return this.props.user.username  ? (
            <div>
                <p>Account</p>
                <p>User Info Here</p>
                <input></input>
                {this.props.user.firstname}
            </div>
        ) : (
                <div>
                    Please Log In
                </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getUser})(UserAccount)