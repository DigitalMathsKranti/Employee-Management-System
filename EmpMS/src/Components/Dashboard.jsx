import React from 'react'
import {Link, Outlet, useNavigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css"
import axios from 'axios';

const Dashboard = () => {
  //for cookies store 
  axios.defaults.withCredentials=true;
  const navigate =useNavigate()
  const handleLogout=()=>{
    axios.get('http://localhost:3000/auth/logout')
    .then(result=>{
      if(result.data.status){
        navigate('/')
      }
    })
  }
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link to="/dashboard" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
            <span className="fs-6 fw-bolder  d-sm-inlilne"> Dmk Web Developer</span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="w-100 ">
                <Link 
                  to="/dashboard"
                  className="nav-link text-white px-0 align-middle"               
                >
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li className="w-100 ">
                <Link 
                  to="/dashboard/employee"
                  className="nav-link text-white px-0 align-middle "               
                >
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Manage Employee</span>
                </Link>
              </li>
              <li className="w-100 ">
                <Link 
                  to="/dashboard/category"
                  className="nav-link text-white px-0 align-middle"               
                >
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Category</span>
                </Link>
              </li>
              <li className="w-100 ">
                <Link 
                  to="/dashboard/profile"
                  className="nav-link text-white px-0 align-middle"               
                >
                  <i className="fs-4 bi-person ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Profiles</span>
                </Link>
              </li>
              <li className="w-100" onClick={handleLogout}>
                <Link 
                  to="/dashboard/logout"
                  className="nav-link text-white px-0 align-middle"               
                >
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Employee Managment System</h4>
          </div>
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard