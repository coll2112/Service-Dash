import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './SiteInfo.scss'

export default function SiteInfo(){
    return(
        <div className='details'>
            <div className='detail-item'>
                <FontAwesomeIcon icon='comments' size='8x' className='icon'/>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam volutpat tincidunt volutpat. Orci varius natoque penatibus et magnis dis parturient montes, nascetu.</p>
            </div>
            <div className='detail-item'>
                <FontAwesomeIcon icon='dollar-sign' size='8x' className='icon'/>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam volutpat tincidunt volutpat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec sit amet tempus purus. Cras eget lig.</p>
            </div>
            <div className='detail-item'>
                <FontAwesomeIcon icon='tachometer-alt' size='8x' className='icon'/>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam volutpat tincidunt volutpat.</p>
            </div>
        </div>
    )
}