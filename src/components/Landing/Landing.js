import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUser, getUserInfo} from '../../ducks/reducer'
import SiteInfo from '../SiteInfo/SiteInfo'
import Testimonials from '../Testimonials/Testimonials'
import './Landing.scss'


class Landing extends Component{

    componentDidMount(){
        this.props.getUser();
        this.props.getUserInfo();
    }

    render(){
        return(
            <div className='container'>
                    <div className='showcase'>
                        <h2>PushCo</h2>
                        <h3>Pushing for Perfection</h3>
                        {
                        this.props.user.username ? 
                        null : 
                        <button className='button' onClick={()=>this.props.history.push('register')}>Sign Up Now!</button>
                        }
                    </div>
                <SiteInfo/>
                <Testimonials/>
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getUser, getUserInfo})(Landing);