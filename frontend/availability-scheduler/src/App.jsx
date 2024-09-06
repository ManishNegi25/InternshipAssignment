import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Login from './components/Login';
import Availability from './components/Availability';
import AdminDashboard from './components/AdminDashboard';
import ManageAvailability  from './components/userdashboard';

const App=()=>{
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/availability" element={<Availability/>}/>
          <Route path="/admin" element={<AdminDashboard/>}/>
          <Route path="/userdashboard" element={<ManageAvailability />} />
        </Routes>
      </div>
    </Router>
  )
};
export default App;
