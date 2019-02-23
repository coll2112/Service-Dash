import React, {Component} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './Testimonials.scss'

class Testimonials extends Component{
    constructor(){
        super();
        this.state={
            reviews: [{name:'george', review:'howdy'},
                      {name:'Billy', review:'Great service. Quick and easy. Definitely reccommend them to anyone. I love PushCo!'},
                      {name:'gregory', review:'great'}]
        }
    }

    render(){
        const reviewMap = this.state.reviews.map((e,i)=>{
            return(
                <div key={i} className='review'>
                    <FontAwesomeIcon icon='chevron-circle-left' size='3x' className='buttons'/>
                    <div>
                        <h3>{e.name}</h3>
                        <p>{e.review}</p>
                    </div>
                    <FontAwesomeIcon icon='chevron-circle-right' size='3x' className='buttons'/>
                </div>
            )
        })

        return(
            <div className='main-container'>
                <div className='review-container'>
                    {reviewMap}
                </div>
            </div>
        )
    }
}

export default Testimonials