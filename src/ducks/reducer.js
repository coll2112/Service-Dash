import axios from 'axios'

const initialState = {
    user:{},
    err: false
}

const GET_USER = 'GET_USER'
const LOGOUT = 'LOGOUT'

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
        default:
        return state;
    }
}