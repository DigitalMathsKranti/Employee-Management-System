import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [values,setValues]=useState({
        email:'',
        password:''
    });
    //for cookies store 
    axios.defaults.withCredentials=true;

    //for navitions
    const navigate =useNavigate()
    const [error,seterror]=useState(null);
    const handleSubmit= async (event)=>{
        event.preventDefault();
        // console.log(values);
        
        try {
            const response = await axios.post('http://localhost:3000/auth/adminlogin', values);
            console.log('Response:', response.data);
            if (response.data.loginStatus){
                navigate('/dashboard');
            }else{
                
                seterror(response.data.error);
            }
            
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 200 range
                console.error('Server Error:', error.response.data);
            } else if (error.request) {
                // Request was made but no response received
                console.error('Network Error:', error.request);
            } else {
                // Something else happened while setting up the request
                console.error('Error:', error.message);
            }
        }

    };
    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage' >
            <div className='p-3 rounded w-25 border loginform'>
                <div className='text-warning'>
                    {error && error}
                </div>
                <h2 className='text-center'>Login Page</h2>
                <form onSubmit={handleSubmit} >
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong>:</label>
                        <input type="email" name="email" id="email" autoCapitalize='off' placeholder='Enter Email' 
                        className='form-control rounded-0'
                        onChange={(e)=>{setValues({...values,email:e.target.value})}}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" name="password" id="password" placeholder='Enter Password' 
                        className='form-control rounded-0' 
                        onChange={(e)=>{
                            setValues({...values,password:e.target.value});
                            
                            }}/>
                    </div>
                    <button className='btn btn-success w-100 rounded-0'>Submit</button>
                    <div className='m-1'>
                        <input type="checkbox" name="tick" id="tick" className='me-2'/>
                        <label htmlFor="tick"> You are Agree Terms and Condition</label>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login