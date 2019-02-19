import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUser, getUserInfo} from '../../ducks/reducer'
import './Landing.scss'

class Landing extends Component{

    componentDidMount(){
        this.props.getUser();
        this.props.getUserInfo();
    }

    render(){
        return(
            <div className='container'>
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