import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeDashboard = () => {
  const userName = localStorage.getItem('name');
  const [assignedLaptop, setAssignedLaptop] = useState({});
  const [issueDescription, setIssueDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch the assigned laptop data for the employee
  const fetchAssignedLaptop = async () => {
    try {
      const employeeId = localStorage.getItem('id'); // Assuming employee ID is stored in localStorage
      console.log(employeeId);
      const response = await axios.get(`http://localhost:5000/api/employee/assignments/${employeeId}`);
      setAssignedLaptop(response.data[0].laptopId);
      console.log(response.data);
      console.log(assignedLaptop);
    } catch (err) {
      setError('Error fetching assigned laptop.');
    }
  };

  useEffect(() => {
    fetchAssignedLaptop();
  }, []);

  // Handle issue report submission
  const handleReportIssue = async (e) => {
    e.preventDefault();
    try {
      
      const employeeId = localStorage.getItem('employeeId'); // Assuming employee ID is stored in localStorage
      await axios.post('http://localhost:5000/api/maintenance/issues', {
        
        laptopId:'6752059b6f8eb444761e2dd0',
        description: issueDescription,
        priority,
        employeeId:'6750e598f854befee78987f1',
      });
      setMessage('Issue reported successfully!');
      setIssueDescription('');
      setPriority('Low');
    } catch (err) {
      setError('Error reporting issue.');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Welcome, {userName}</h1>
      <h2>Employee Dashboard</h2>

      {/* Success/Error Messages */}
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Assigned Laptop Details */}
      <div className="card mt-4">
        <div className="card-header">Assigned Laptop</div>
        <div className="card-body">
          {assignedLaptop ? (
            <>
              <h5 className="card-title">Laptop Details</h5>
              <ul>
                
                <li><strong>Brand:</strong> {assignedLaptop.brand}</li>
                <li><strong>Model:</strong> {assignedLaptop.model}</li>
                <li><strong>Serial Number:</strong> {assignedLaptop.serialNumber}</li>
                <li><strong>Status:</strong> {assignedLaptop.status}</li>
              </ul>
            </>
          ) : (
            <p>No laptop assigned yet.</p>
          )}
        </div>
      </div>

      {/* Report Issue Section */}
      <div className="card mt-4">
        <div className="card-header">Report an Issue</div>
        <div className="card-body">
          <form onSubmit={handleReportIssue}>
            <div className="mb-3">
              <label htmlFor="issueDescription" className="form-label">Issue Description</label>
              <textarea
                className="form-control"
                id="issueDescription"
                rows="3"
                placeholder="Describe the issue"
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="priority" className="form-label">Priority</label>
              <select
                className="form-select"
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <button type="submit" className="btn btn-danger">Report Issue</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
