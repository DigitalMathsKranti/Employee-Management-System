import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditEmployee = () => {
    const {id} =useParams();
    const navigate = useNavigate();
    const [employee,setEmployee]=useState({
        name:'',
        email:'',
        salary:'',
        address:'',
        category_id:'',
       
    });
    const [category, setCategory] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/auth/category')
            .then(result => {
                if (result.data.status) {
                    // console.log(result.data.result)
                    setCategory(result.data.result)
                } else {
                    alert(result.data.error)
                }
            })
            .catch(err => console.error(err))
            axios.get('http://localhost:3000/auth/employee/'+id)
            .then(result => {
                if (result.data.status) {
                    console.log(result.data.result)
                    setEmployee({
                      ...employee,
                      name:result.data.result[0].name,
                      email:result.data.result[0].email,
                      salary:result.data.result[0].salary,
                      address:result.data.result[0].address,
                      category_id:result.data.result[0].category_id,
                    })
                } else {
                    alert(result.data.error)
                }
            })
            .catch(err => console.error(err))
    }, [])

  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.put('http://localhost:3000/auth/edit_employee/'+id,employee)
    .then(result=>{
      if(result.data.status){
        navigate('/dashboard/employee')
      }else{
        alert(result.data.error)
      }
    })
    .catch(err=>console.error(err))
  }

  return (
    <div className='d-flex justify-content-center align-items-center mt-1' >
            <div className='p-1 rounded w-50 border '>

                <h2 className='text-center'>Edit Employee</h2>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor="inputName" className='form-label'>Name</label>
                        <input type="text" id="inputName" placeholder='Enter Name'
                            className='form-control rounded-0'
                            value={employee.name}
                            onChange={(e)=>setEmployee({...employee,name:e.target.value})}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="inputEmail4" className='form-label'>Email</label>
                        <input type="Email" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
                            className='form-control rounded-0'
                            value={employee.email}
                            onChange={(e)=>setEmployee({...employee,email:e.target.value})}
                        />
                    </div>
                    {/* <div className='col-12'>
                        <label htmlFor="inputPassword" className='form-label'>Password</label>
                        <input type="password" id="inputPassword" placeholder='Enter Password' autoComplete='off'
                            className='form-control rounded-0'
                            onChange={(e)=>setEmployee({...employee,password:e.target.value})}
                        />
                    </div> */}
                    <div className='col-12'>
                        <label htmlFor="inputSalary" className='form-label'>Salary</label>
                        <input type="text" id="inputSalary" placeholder='Enter Salary' autoComplete='off'
                            className='form-control rounded-0'
                            value={employee.salary}
                            onChange={(e)=>setEmployee({...employee,salary:e.target.value})}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="inputAddress" className='form-label'>Address</label>
                        <input type="text" id="inputAddress" placeholder='Enter Address' autoComplete='off'
                            value={employee.address}
                            className='form-control rounded-0'
                            onChange={(e)=>setEmployee({...employee,address:e.target.value})}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="category" className='form-label'>Category</label>
                        <select name="category" id="category" className='form-select'
                            value={employee.category_id}
                            onChange={(e)=>setEmployee({...employee,category_id:e.target.value})}
                        >
                            { console.log(`category:${category}`)}
                            {
                                category.map(c=>{
                                return <option value={c.id}>{c.name}</option>
                            })}
                        </select>
                    </div>
                    <div className='col-12'>
                        <button type='submit' className='btn btn-success w-100 rounded-2'>Add Employee</button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default EditEmployee