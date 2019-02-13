import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUser, logout, loginChange} from '../../ducks/reducer'
import './Navbar.css'


class Navbar extends Component{
    // componentDidMount(){
    //     this.props.getUser()
    // }

    render(){
        // console.log(this.props.login)
        return(
            <div className='navbar'>
                <Link to='/'><h1>Push.Co</h1></Link>
                <div className='links'>
                    <Link to='/'><li>Home</li></Link>
                    {
                        this.props.login ? 
                        null : 
                        <Link to='/account'>Account</Link>
                    }
                    {
                        this.props.login ? 
                        <Link to='/login'><li>Login</li></Link> : 
                        <Link to='/' onClick={()=>this.props.loginChange()}>Log Out</Link>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps=state=>state

export default connect(mapStateToProps, {loginChange})(Navbar);