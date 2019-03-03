import React, {Component} from 'react'
import {Link, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUser, getUserInfo, logout} from '../../ducks/reducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Navbar.scss'


class Navbar extends Component{
    constructor(){
        super();
        this.state={
            isToggled: false,
            className:'mobile-links animated fadeInDown'
        }
    }

    async componentDidMount(){
        await this.props.getUser();
        this.props.getUserInfo(this.props.user.id);
    }

    toggleMobileNav=()=>{
        this.setState({
            isToggled:!this.state.isToggled,
        })
    }

    closeNav=()=>{
        this.setState({isToggled:false})
    }

    logoutAndClose=()=>{
        this.props.logout();
        this.closeNav();
    }

    render(){
        // console.log(this.state.isToggled)
        return(
            <div className='navbar'>
                <div className='logo'>
                    <FontAwesomeIcon icon='people-carry' size='2x'/>
                    <h1>Push.Co</h1>
                </div>
                <div className='links'>
                    <Link exact to='/' activeClassName='selected'><li>Home</li></Link>
                    {
                        this.props.user.isAdmin === 'true' ? 
                        <Link to='/portal' activeClassName='selected'><li>Admin Portal</li></Link> : 
                        null
                    }
                    {
                        !this.props.user.username ? 
                        null : 
                            this.props.user.isAdmin === null ? 
                            <Link to='/dashboard' activeClassName='selected'>Dashboard</Link> :
                            null
                    }
                    {
                        this.props.user.username ? 
                        <Link exact to='/' activeClassName='selected' onClick={()=>this.props.logout()}><li>Logout</li></Link> :
                        <Link to='/login' activeClassName='selected'><li>Login</li></Link>
                        
                    }
                </div>
                <div className='mobileNav'>
                    <FontAwesomeIcon icon='bars' size='2x' onClick={()=>this.toggleMobileNav()}/>
                </div>
                {
                        this.state.isToggled ? 
                        <div className={this.state.className}>
                        <Link exact to='/' onClick={()=>this.closeNav()}><li>Home</li></Link>
                        {
                            this.props.user.isAdmin === 'true' ? 
                            <Link to='/portal' onClick={()=>this.closeNav()}><li>Admin Portal</li></Link> : 
                            null
                        }
                        {
                            !this.props.user.username ? 
                            null : 
                                this.props.user.isAdmin === null ? 
                                <Link to='/dashboard' onClick={()=>this.closeNav()}>Dashboard</Link> :
                                null
                        }
                        {
                            this.props.user.username ? 
                            <Link exact to='/' onClick={()=>this.logoutAndClose()}><li>Logout</li></Link> :
                            <Link to='/login' onClick={()=>this.closeNav()}><li>Login</li></Link>
                            
                        }
                    </div> : 
                            null
                    }
            </div>
        )
    }
}

const mapStateToProps=state=>state

export default connect(mapStateToProps, {getUser, logout, getUserInfo})(Navbar);