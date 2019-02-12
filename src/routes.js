import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Login from './components/Login/Login'
import UserAccount from './components/UserAccount/UserAccount'
import Register from './components/Register/Register'

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/account' component={UserAccount}/>
    </Switch>
)