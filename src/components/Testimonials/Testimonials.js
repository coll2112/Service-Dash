import React, {Component} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Carousel from 'nuka-carousel';
import './Testimonials.scss'

class Testimonials extends Component{
    constructor(){
        super();
        this.state={
            reviews: [{name:'Ann', review:'PushCo pushes to be the best! Outstanding customer service and satisfaction.' , home:'Dallas, TX'},
                      {name:'Billy', review:'Great service. Quick and easy. Definitely recommend them to anyone. I love PushCo!', home:'San Francisco, CA'},
                      {name:'Craig', review:'Super speedy! Quick responses and all around polite. Cannot wait to work with them again', home:'Denver, CO'}]
        }
    }

    render(){
        const reviewMap = this.state.reviews.map((e,i)=>{
            return(
                <div key={i} className='review'>
                    <FontAwesomeIcon icon='quote-left' size='2x' className='quotes'/>
                    <div>
                        <h3>{e.name}</h3>
                        <p>{e.home}</p>
                        <p>{e.review}</p>
                    </div>
                    <FontAwesomeIcon icon='quote-right' size='2x' className='quotes'/>
                </div>
            )
        })

        return(
            <div className='main-container'>
                <div className='review-container'>
                    <div className='review-content'>
                        <Carousel
                            slidesToShow={1}
                            autoplay={true}
                            frameOverflow={false}
                            autoplayInterval={7500}
                            wrapAround={true}
                            // transitionMode={'zoom'}
                            width={'80vw'}
                            height={'100vh'}
                            withoutControls={true}
                        >
                            {reviewMap}
                        </Carousel>
                    </div>
                </div>
            </div>
        )
    }
}

export default Testimonials