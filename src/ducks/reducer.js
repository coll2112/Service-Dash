import axios from 'axios'

const initialState = {
    user:{},
    userInfo:{},
    serviceRequests: [],
    err: false,
    login: true
    //show login ^^
}

const GET_USER = 'GET_USER'
const LOGOUT = 'LOGOUT'
const LOGIN_CHANGE = 'LOGIN_CHANGE'
const GET_USER_INFO = 'GET_USER_INFO'
const GET_SERVICE_REQUESTS = 'GET_SERVICE_REQUESTS'

export const getUser=()=>{
    return{
        type: GET_USER,
        payload: axios.get('/api/user')
    }
}

export const logout=()=>{
    return{
        type: LOGOUT,
        payload: axios.get('/api/logout')
    }
}

export const getUserInfo=(id)=>{
    // console.log(id)
    return{
        type: GET_USER_INFO,
        payload: axios.get(`/api/customers/${id}`)
    }
}

export const loginChange=()=>{
    return{
        type: LOGIN_CHANGE,
        payload: false
    }
}

export const getRequests=()=>{
    return{
        type: GET_SERVICE_REQUESTS,
        payload: axios.get('/api/requests')
    }
}

export default function reducer(state=initialState, action){
    switch(action.type){
        case `${GET_USER}_FULFILLED`:
        return{
            ...state,
            user: action.payload.data
        }
        case `${GET_USER}_REJECTED`:
        return{
            ...state,
            err: true
        }
        case `${LOGOUT}_FULFILLED`:
        return{
            ...state,
            user: action.payload.data,
            userInfo:{},
            login: true
        }
        case LOGIN_CHANGE:
        // console.log(action.payload)
        return{
            ...state,
            login: action.payload
        }
        case `${GET_USER_INFO}_FULFILLED`:
        return{
            ...state,
            userInfo: action.payload.data
        }
        case `${GET_USER_INFO}_REJECTED`:
        return{
            ...state,
            err: true
        }
        case `${GET_SERVICE_REQUESTS}_FULFILLED`:
        return{
            ...state,
            serviceRequests: action.payload.data
        }
        default:
        return state;
    }
}