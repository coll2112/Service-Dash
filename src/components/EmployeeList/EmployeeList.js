import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getEmployees} from '../../ducks/reducer'
import Loader from 'react-loader-spinner'
import axios from 'axios'
import './EmployeeList.scss'

class EmployeeList extends Component{
    
    componentDidMount(){
        this.props.getEmployees();
    }

    removeEmployee=(id)=>{
        axios.delete(`/api/employee/remove/${id}`).then(response=>{
            this.props.getEmployees()
        }).catch(err=>console.log(err))
    }

    render(){
        const employeeMap = this.props.employees.map((e,i)=>{
            return(
                <div className='wrapper'>
                    <div key={i} className='employeeList'>
                        <h3>Employee ID: {e.employee_id}</h3>
                        <h3>{e.firstname} {e.lastname}</h3>
                        <button onClick={()=>this.removeEmployee(e.employee_id)}>Remove Employee</button>
                    </div>
                </div>
            )
        })

        return this.props.isLoading ? (
            <div><Loader Loader type="Oval" color="#7C90A0" height={100} width={100}/></div>
        ) : (
            <div>{employeeMap}</div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {getEmployees})(EmployeeList)