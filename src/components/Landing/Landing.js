import React, {Component} from 'react'
import Navbar from '../Navbar/Navbar'
import {Link} from 'react-router-dom'
import './Landing.css'

class Landing extends Component{
    render(){
        return(
            <div className='container'>
                {/* <Navbar/> */}
                <div className='landing-flex'>
                    <h2>PushCo</h2>
                    <h3>Pushing for Perfection</h3>
                    <Link to='register'><button className='button'>Sign Up Now!</button></Link>
                </div>
            </div>
        )
    }
}

export default Landing;