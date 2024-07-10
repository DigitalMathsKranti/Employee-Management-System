
import './App.css';
import Category from './Components/Category';
import Dashboard from './Components/Dashboard';
import Employee from './Components/Employee';
import Home from './Components/Home';
import Start from './Components/Start';
import Login from './Components/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import{BrowserRouter,Routes,Route} from 'react-router-dom';
import Profile from './Profile';
import AddCategory from './Components/AddCategory';
import AddEmployee from './Components/AddEmployee';
import EditEmployee from './Components/EditEmployee';
import EmployeeLogin from './Components/EmployeeLogin';
import EmployeeDetail from './Components/EmployeeDetail';

function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Start/>}></Route>
      <Route path='/employee_login' element={<EmployeeLogin/>}></Route>
      <Route path='/employee_detail/:id' element={<EmployeeDetail/>}></Route>
      <Route path='/admin_login' element={<Login/>}></Route>
      {/* <Route path='/adminlogin' element={<Login/>}></Route> */}
      <Route path='/dashboard' element={<Dashboard/>}>
        <Route path='' element={<Home/>}></Route>     
        <Route path='/dashboard/employee' element={<Employee/>}></Route>     
        <Route path='/dashboard/category' element={<Category/>}></Route>     
        <Route path='/dashboard/profile' element={<Profile/>}></Route>     
        <Route path='/dashboard/addcategory' element={<AddCategory/>}></Route>     
        <Route path='/dashboard/add_employee' element={<AddEmployee/>}></Route>     
        <Route path='/dashboard/edit_employee/:id' element={<EditEmployee/>}></Route>     
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
