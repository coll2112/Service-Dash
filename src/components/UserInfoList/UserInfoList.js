import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUserInfo, getUser} from '../../ducks/reducer'

class UserInfoList extends Component{

    async componentDidMount(){
        await this.props.getUser();
        this.props.getUserInfo(this.props.user.id);
    }


    render(){
        
        // if(this.props.userInfo[0]){
        //     var userMap = this.props.userInfo.map((e,i)=>{
        //         <p key={i}>{e.firstname}</p>
        //     })
        // }

        if(this.props.userInfo[0]){
            console.log(this.props.userInfo[0])
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