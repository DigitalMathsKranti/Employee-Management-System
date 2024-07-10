import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState();
    useEffect(()=>{
        axios.get('http://localhost:3000/auth/category')
        .then(result=>{
          if(result.data.status){
            // console.log(result.data.result)
            setCategory(result.data.result)
          }else{
            alert(result.data.error)
          }
        })
        .catch(err=>console.error(err))
          
        
      },[]);
    
    const handleSubmit = (event) => {
        event.preventDefault()
        
        axios.post('http://localhost:3000/auth/addcategory', {category} )
            .then(result => {
                if (result.data.status) {
                    navigate('/dashboard/category')
                } else {
                    alert(result.data.error)
                }
            })
            .catch(error => {
                console.error(error);
            })
    }
    
    return (
        <div className='d-flex justify-content-center align-items-center h-75' >
            <div className='p-3 rounded w-25 border '>

                <h2 className='text-center w-100'>Add Category</h2>
                <form onSubmit={handleSubmit} >
                    <div className='mb-3'>
                        <label htmlFor="category"><strong>Category</strong>:</label>
                        <input type="text" name="category" id="category" placeholder='Enter Category'
                            className='form-control rounded-0'
                            onChange={(e) => setCategory(e.target.value)} />
                    </div>

                    <button className='btn btn-success w-100 rounded-0'>Add</button>

                </form>
            </div>
        </div>
    )
}

export default AddCategory