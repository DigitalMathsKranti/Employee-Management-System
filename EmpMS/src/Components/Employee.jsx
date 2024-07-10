import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Employee = () => {
    const [employee,setEmployee] =useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/auth/employee')
            .then(result => {
                if (result.data.status) {
                    setEmployee(result.data.result)
                } else {
                    alert(result.data.error)
                }
            })
            .catch(err => console.error(err))
        
    }, [])
    const navigate =useNavigate()
    const handleDelete =(id)=>{
      axios.delete('http://localhost:3000/auth/delete_employee/'+id)
      .then(result=>{
        console.log(result.data.result)
        if(result.data.status){
          window.location.reload()
        }else{
          alert(result.data.error)
        }
      })
      .catch(err=>{
        console.error(err)
      })
    }
    return (
        <div className='px-5 mt-5 '>
            <div className='d-flex justify-content-center'>
                <h3>Employee List</h3>
            </div>
            <Link to="/dashboard/add_employee" className='btn btn-success'>Add Employee</Link>
            <div className='mt-3'>
            <table className='table border-solid'>
                <thead>
                  <tr>
                    <th>Sr.</th>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Salary</th>
                    <th>Address</th>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody >
                  {employee.map(e=>(
                    <tr>
                      <td>{e.id}</td>
                      <td>
                        <img src={`http://localhost:3000/Images/`+e.image} className="employee_image" alt={e.image} />
                      </td>
                      <td>{e.name}</td>
                      <td>{e.email}</td>
                      <td>{e.salary}</td>
                      <td>{e.address}</td>
                      <td>{e.category_id}</td>
                      <td>
                        <Link to={`/dashboard/edit_employee/`+e.id} className='btn btn-success btn-sm me-2'>Edit</Link>
                        <button className='btn btn-danger btn-sm' onClick={()=>handleDelete(e.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                  
                </tbody>
              </table>
            </div>
        </div>
    )
}

export default Employee