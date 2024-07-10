import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Category = () => {
  const [category,setCategory]=useState([])
  useEffect(()=>{
    axios.get('http://localhost:3000/auth/category')
    .then(result=>{
      if(result.data.status){
        setCategory(result.data.result)
      }else{
        alert(result.data.error)
      }
    })
    .catch(err=>console.error(err))
      
    
  },[])
  return (
    
        <div className='px-5 mt-5 '>
            <div className='d-flex justify-content-center'> 
                <h3>Category List</h3>
            </div>
            <Link to="/dashboard/addcategory" className='btn btn-success'>Add Category</Link>
            <div className='mt-3'>
              <table className='table border-solid'>
                <thead>
                  <tr>
                    <th>Sr.</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody >
                  {category.map(c=>(
                    <tr>
                      <td>{c.id}</td>
                      <td>{c.name}</td>
                    </tr>
                  ))}
                  
                </tbody>
              </table>
            </div>
        </div>
    
  )
}

export default Category