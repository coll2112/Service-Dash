import React, { Component } from "react";
import { connect } from "react-redux";
import {getUserInfo} from '../../ducks/reducer'

class Dashboard extends Component{
    componentDidMount(){
        
    }

    render(){
        return(
            <div>
                
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getUserInfo})(Dashboard)