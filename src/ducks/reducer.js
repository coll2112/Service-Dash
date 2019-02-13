import axios from 'axios'

const initialState = {
    user:{},
    userInfo:{},
    err: false,
    login: true
}

const GET_USER = 'GET_USER'
const LOGOUT = 'LOGOUT'
const LOGIN_CHANGE = 'LOGIN_CHANGE'
const GET_USER_INFO = 'GET_USER_INFO'

export const getUser=()=>{
    return{
        type: GET_USER,
        payload: axios.get('/api/user')
    }
}

export const logout=()=>{
    return{
        type: LOGOUT,
        payload: axios.post('/api/logout')
    }
}

export const getUserInfo=()=>{
    
}

export const loginChange=()=>{
    // console.log(initialState.login)
    initialState.login=!initialState.login
    // console.log(initialState.login)
    return{
        type: LOGIN_CHANGE,
        payload: initialState.login
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
            user: action.payload.data
        }
        case LOGIN_CHANGE:
        // console.log(action.payload)
        return{
            ...state,
            login: action.payload
        }
        default:
        return state;
    }
}