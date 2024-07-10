import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const AddEmployee = () => {
    const navigate = useNavigate();
    const [employee,setEmployee]=useState({
        name:'',
        email:'',
        password:'',
        salary:'',
        address:'',
        image:'',
        category_id:'1',

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
        
    }, [])

    const handleSubmit=(e)=>{
        e.preventDefault()
        //multer use because it is Middlewale 'mulltypart/farm-data'
        const formData =new FormData();
        formData.append('name',employee.name);
        formData.append('email',employee.email);
        formData.append('password',employee.password);
        formData.append('salary',employee.salary);
        formData.append('address',employee.address);
        formData.append('image',employee.image);
        formData.append('category_id',employee.category_id);
        console.log(`formData:${formData}`)
        axios.post('http://localhost:3000/auth/add_employee',formData)
        .then(result=>{
            if(result.data.status){
                navigate('/dashboard/employee')
            }else{
                alert(result.data.error)
            }
        })
        .catch(err=>console.log(err))
    }
    return (
        <div className='d-flex justify-content-center align-items-center mt-3' >
            <div className='p-3 rounded w-50 border '>

                <h2 className='text-center'>Add Employee</h2>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor="inputName" className='form-label'>Name</label>
                        <input type="text" id="inputName" placeholder='Enter Name'
                            className='form-control rounded-0'
                            onChange={(e)=>setEmployee({...employee,name:e.target.value})}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="inputEmail4" className='form-label'>Email</label>
                        <input type="Email" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
                            className='form-control rounded-0'
                            onChange={(e)=>setEmployee({...employee,email:e.target.value})}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="inputPassword" className='form-label'>Password</label>
                        <input type="password" id="inputPassword" placeholder='Enter Password' autoComplete='off'
                            className='form-control rounded-0'
                            onChange={(e)=>setEmployee({...employee,password:e.target.value})}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="inputSalary" className='form-label'>Salary</label>
                        <input type="text" id="inputSalary" placeholder='Enter Salary' autoComplete='off'
                            className='form-control rounded-0'
                            onChange={(e)=>setEmployee({...employee,salary:e.target.value})}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="inputAddress" className='form-label'>Address</label>
                        <input type="text" id="inputAddress" placeholder='Enter Address' autoComplete='off'
                            className='form-control rounded-0'
                            onChange={(e)=>setEmployee({...employee,address:e.target.value})}
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="category" className='form-label'>Category</label>
                        <select name="category" id="category" className='form-select'
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
                        <label htmlFor="inputGroupFile01" className='form-label'>Select Image</label>
                        <input 
                            type="file" id="inputGroupFile01"
                            className='form-control rounded-0'
                            name='image'
                            onChange={(e)=>setEmployee({...employee, image: e.target.files[0]})}
                        />
                    </div>


                    <div className='col-12'>
                        <button type='submit' className='btn btn-success w-100 rounded-2'>Add Employee</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddEmployee