import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'


class Navbar extends Component{
    constructor(){
        super();
        this.state={
            loginChange: true
        }
    }

    changeLink =()=>{
        this.setState({loginChange:!true})
    }

    render(){
        return(
            <div className='navbar'>
                <Link to='/'><h1>Push.Co</h1></Link>
                <div className='links'>
                    <Link to='/'><li>Home</li></Link>
                    <Link to='/login' onClick={()=>this.changeLink()}><li>Login</li></Link>
                </div>
            </div>
        )
    }
}

export default Navbar;