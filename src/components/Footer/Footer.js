import React, {Component} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './Footer.scss'

class Footer extends Component{
    render(){
        return(
            <div className='footer-container'>
                <div className='footer-content'>
                    <div className='copyright'>
                        <p>PushCo, Inc. &copy;</p>
                    </div>
                    <div className='social-icons'>
                        <span><FontAwesomeIcon icon={['fab','facebook-square']} size='2x'/></span>
                        <span><FontAwesomeIcon icon={['fab','twitter-square']} size='2x'/></span>
                        <span><FontAwesomeIcon icon={['fab','instagram']} size='2x'/></span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer