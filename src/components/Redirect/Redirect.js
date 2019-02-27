import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './Redirect.scss'

class AccessDenied extends Component{
    constructor(){
        super();
        this.state={
            redirect: false,
            seconds: 5
        }
    }
      

    componentDidMount(){
        
        // for(let i=5;i>0;i--){
        //     this.setState({seconds:this.state.seconds-1})
        //     // setTimeout(()=>{
        //     // }, 1000)
        // }

        setTimeout(() => {
            this.setState({seconds:this.state.seconds-1})
            this.props.history.push('/login')
        }, 5000);

    }

    render(){
        return(
            <div className='redirect-container'>
                <FontAwesomeIcon icon='compass' size='6x' className='compass-icon'/>
                <h2>Uh-oh. Looks like you took a wrong turn.</h2>
                <p>Don't worry, we'll help you find your way!</p>
                {/* <p>Redirecting in: {this.state.seconds}</p> */}
            </div>
        )
    }
}

export default withRouter(AccessDenied)