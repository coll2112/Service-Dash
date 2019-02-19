import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Login from './components/Login/Login'
import UserAccount from './components/UserAccount/UserAccount'
import Dashboard from './components/Dashboard/Dashboard'
import Register from './components/Register/Register'
import AdminPortal from './components/AdminPortal/AdminPortal'
import AdminServiceRequests from './components/AdminServiceRequests/AdminServiceRequests'
import UserApplication from './components/UserApplication/UserApplication'
import UserInfoForm from './components/UserInfoForm/UserInfoForm'

export default (
    <Switch>
        {/* Landing, Login, and Register */}
        <Route exact path='/' component={Landing}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>

        {/* User Side Routes */}
        <Route exact path='/dashboard' component={Dashboard}/>
        <Route exact path='/dashboard/account' component={UserAccount}/>
        <Route exact path='/dashboard/account/info' component={UserInfoForm}/>
        <Route exact path='/dashboard/application' component={UserApplication}/>

        {/* Admin Side Routes */}
        <Route exact path='/portal' component={AdminPortal}/>
        <Route exact path='/portal/requests' component={AdminServiceRequests}/>
    </Switch>
)