import React, {Component} from 'react'
import Navbar from '../Navbar/Navbar'
import {Link} from 'react-router-dom'
import './Landing.scss'
import {connect} from 'react-redux'
import {getUser, getUserInfo} from '../../ducks/reducer'

class Landing extends Component{

    componentDidMount(){
        this.props.getUser();
        this.props.getUserInfo();
    }

    render(){
        return(
            <div className='container'>
                {/* <Navbar/> */}
                <div className='landing-flex'>
                    <h2>PushCo</h2>
                    <h3>Pushing for Perfection</h3>
                    {
                    this.props.user.username ? 
                    <h4>Hello {this.props.user.username}!</h4> : 
                    <Link to='register'><button className='button'>Sign Up Now!</button></Link>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getUser, getUserInfo})(Landing);