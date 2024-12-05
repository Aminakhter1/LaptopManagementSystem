
import './App.css';

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Home from './components/Home';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute'; // For protected routes

// API Calls and Context (for authentication)
import { getUser } from './services/authService';

function App() {
  const [user, setUser] = useState(null);

  // Fetch user info from local storage or session to check if logged in
  useEffect(() => {
    const loggedInUser = getUser();
    if (loggedInUser) {
      setUser(loggedInUser);
      
    }
  }, []);
  return (
    <Router>
    <Navbar user={user} setUser={setUser} />
    <div className="container mt-4">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login setUser={setUser} />} />

        {/* Protected Routes */}
        <Route
          path="/admin-dashboard"
          element={
            
              <AdminDashboard />
          
          }
        />
        <Route
          path="/employee-dashboard"
          element={
            
              <EmployeeDashboard />
            
          }
        />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </div>
  </Router>
   
    
         
    
  );
}

export default App;
