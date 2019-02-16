import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUser, getUserInfo, logout} from '../../ducks/reducer'
import './Navbar.scss'


class Navbar extends Component{

    async componentDidMount(){
        this.props.getUser();
        this.props.getUserInfo(this.props.user.id);
    }

    render(){
        console.log(this.props.user)
        return(
            <div className='navbar'>
                <Link to='/'><h1>Push.Co</h1></Link>
                <div className='links'>
                    <Link to='/'><li>Home</li></Link>
                    {
                        this.props.user.isAdmin == 'true' ? 
                        <Link to='/portal'>Admin Portal</Link> : 
                        null
                    }
                    {
                        !this.props.user.id ? 
                        null : 
                            this.props.user.isAdmin === null ? 
                            <Link to='/account'>Account</Link> :
                            null
                    }
                    {
                        this.props.user.id ? 
                        <Link to='/' onClick={()=>this.props.logout()}>Logout</Link> :
                        <Link to='/login'><li>Login</li></Link>
                        
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps=state=>state

export default connect(mapStateToProps, {getUser, logout, getUserInfo})(Navbar);