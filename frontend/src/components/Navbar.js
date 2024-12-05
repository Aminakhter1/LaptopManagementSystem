import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const userName = localStorage.getItem('name');
  const handleLogout = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('token');
      localStorage.removeItem('role'); 
      localStorage.removeItem('id'); 
    
    setUser(null);
  };
 

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Laptop Management System
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          
          {userName ? (
            <>
              <li className="nav-item">
                <span className="nav-link">Hello, {userName}</span>
              </li>
              <li className="nav-item">
                <button className="btn" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

