import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './SiteInfo.scss'

export default function SiteInfo(){
    var style = {color:'#232A34'}
    return(
        <div className='detail-container'>
            <div className='detail-content'>
                <div className='detail-item'>
                    <FontAwesomeIcon icon='comments' size='8x' className='icon' style={style}/>
                    <p>
                        With ServiceDash, we offer quick and timely responses with our customers and the companies we work with. All you have to do is submit an application and our team here at ServiceDash will take care of the rest. 
                    </p>
                </div>
                <div className='detail-item'>
                    <FontAwesomeIcon icon='dollar-sign' size='8x' className='icon' style={style}/>
                    <p>
                        We know that hiring a third-party is expensive, so we work with you to make sure you don't break the bank. With just a flate rate fee of $45, ServiceDash makes sure to take good care of your time and money.
                    </p>
                </div>
                <div className='detail-item'>
                    <FontAwesomeIcon icon='tachometer-alt' size='8x' className='icon' style={style}/>
                    <p>
                        ServiceDash makes sure to get back to you within the same day. We guarantee the companies we work with have immediate openings and places for our customers!
                    </p>
                </div>
            </div>
        </div>
    )
}