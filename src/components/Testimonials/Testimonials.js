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
                      {name:'Craig', review:'Super speedy! Quick responses and all around polite. Cannot wait to work with them again', home:'Denver, CO'},
                      {name:'Harry', review:'They fix everything. Literally everything. Call these people now!', home:'Denton, TX'},
                      {name:'James', review:'We used to blast off all the time, but PushCo finally caught that annoying little Pikachu.', home:'Kanto Region'}]
        }
    }

    render(){
        var settings = {
            dots: true,
            infinite: true,
            speed: 800,
            slidesToShow: 2,
            slidesToScroll: 1
        }

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
                            autoplayInterval={5000}
                            wrapAround={true}
                            width={'55vw'}
                            cellSpacing={300}
                            swiping={false}
                            renderCenterLeftControls={({ previousSlide }) => (
                                  <FontAwesomeIcon onClick={previousSlide} icon='chevron-circle-left' size='3x' className='slide-arrow'/>
                              )}
                            renderCenterRightControls={({ nextSlide }) => (
                                  <FontAwesomeIcon onClick={nextSlide} icon='chevron-circle-right' size='3x' className='slide-arrow'/>
                              )}
                            renderBottomCenterControls={false}
                        >
                            {reviewMap}
                        </Carousel>
                    </div>
                </div>
                <div className='review-container-mobile-version'>
                    <div className='review-content-mobile-version'>
                        <Carousel
                            slidesToShow={1}
                            autoplay={true}
                            frameOverflow={false}
                            autoplayInterval={5000}
                            wrapAround={true}
                            width={'100vw'}
                            cellSpacing={100}
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