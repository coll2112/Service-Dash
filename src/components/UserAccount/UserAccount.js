import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUser, logout} from '../../ducks/reducer'
import {Link} from 'react-router-dom'

class UserAccount extends Component{

    componentDidMount(){
        this.props.getUser()
    }

    render(){
        // console.log(this.props.user)
        return this.props.user.username  ? (
            <div>
                <p>Account</p>
                <Link to='/login'><button onClick={()=>this.props.logout()}>Logout</button></Link>
            </div>
        ) : (
                <div>
                    Please Log In
                </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getUser, logout})(UserAccount)