import React, {Component} from 'react'
import {Link, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUser, getUserInfo, logout} from '../../ducks/reducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Navbar.scss'


class Navbar extends Component{

    async componentDidMount(){
        await this.props.getUser();
        this.props.getUserInfo(this.props.user.id);
    }

    render(){
        console.log(this.props.user)
        return(
            <div className='navbar'>
                <div className='logo'>
                    <FontAwesomeIcon icon='people-carry' size='2x'/>
                    <Link to='/'><h1>Push.Co</h1></Link>
                </div>
                <div className='links'>
                    <NavLink exact to='/' activeClassName='selected'><li>Home</li></NavLink>
                    {
                        this.props.user.isAdmin === 'true' ? 
                        <NavLink to='/portal' activeClassName='selected'><li>Admin Portal</li></NavLink> : 
                        null
                    }
                    {
                        !this.props.user.username ? 
                        null : 
                            this.props.user.isAdmin === null ? 
                            <NavLink to='/dashboard' activeClassName='selected'>Dashboard</NavLink> :
                            null
                    }
                    {
                        this.props.user.username ? 
                        <NavLink exact to='/' activeClassName='selected' onClick={()=>this.props.logout()}><li>Logout</li></NavLink> :
                        <NavLink to='/login' activeClassName='selected'><li>Login</li></NavLink>
                        
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps=state=>state

export default connect(mapStateToProps, {getUser, logout, getUserInfo})(Navbar);