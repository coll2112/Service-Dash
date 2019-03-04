import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUserInfo, getUser} from '../../ducks/reducer'
import axios from 'axios';

class UserInfoList extends Component{

    async componentDidMount(){
        await this.props.getUser();
        this.props.getUserInfo(this.props.user.id);
    }


    render(){

        if(this.props.userInfo[0]){
            var {firstname, lastname, address, city, state, zip} = this.props.userInfo[0]
        }

        return this.props.userInfo[0] ? (
            <div>
                <p>{firstname} {lastname}</p>
                <p>{address}</p>
                <p>{city}, {state}</p>
                <p>{zip}</p>
            </div>
        ) : (
            null
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps,{getUserInfo, getUser})(UserInfoList)