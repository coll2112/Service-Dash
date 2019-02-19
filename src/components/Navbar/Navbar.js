import React, {Component} from 'react'
import {Link, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUser, getUserInfo, logout} from '../../ducks/reducer'
import './Navbar.scss'


class Navbar extends Component{

    async componentDidMount(){
        await this.props.getUser();
        this.props.getUserInfo(this.props.user.id);
    }

    render(){
        // console.log(this.props.user)
        return(
            <div className='navbar'>
                <Link to='/'><h1>Push.Co</h1></Link>
                <div className='links'>
                    <NavLink to='/' activeClassName='active' exact><li>Home</li></NavLink>
                    {
                        this.props.user.isAdmin == 'true' ? 
                        <NavLink to='/portal' activeClassName='active' exact><li>Admin Portal</li></NavLink> : 
                        null
                    }
                    {
                        !this.props.user.id ? 
                        null : 
                            this.props.user.isAdmin === null ? 
                            <NavLink to='/dashboard' activeClassName='active' exact>Dashboard</NavLink> :
                            null
                    }
                    {
                        this.props.user.id ? 
                        <NavLink to='/' activeClassName='active' exact onClick={()=>this.props.logout()}><li>Logout</li></NavLink> :
                        <NavLink to='/login' activeClassName='active' exact><li>Login</li></NavLink>
                        
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps=state=>state

export default connect(mapStateToProps, {getUser, logout, getUserInfo})(Navbar);