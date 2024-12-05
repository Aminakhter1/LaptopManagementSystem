import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [laptops, setLaptops] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [newLaptop, setNewLaptop] = useState({
    brand: '',
    model: '',
    serialNumber: '',
    status: 'available',
  });
  const [newAssignment, setNewAssignment] = useState({
    laptopId: '',
    employeeId: '',
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editLaptop, setEditLaptop] = useState({});
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const [laptopsRes, employeesRes, assignmentsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/laptops'),
        axios.get('http://localhost:5000/api/employee'),
        axios.get('http://localhost:5000/api/employee/allassignedlaptops'),
      ]);

      setLaptops(laptopsRes.data);
      setEmployees(employeesRes.data);
      setAssignments(assignmentsRes.data);
    } catch (err) {
      setError('Error fetching data.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add or Update Laptop
  const handleLaptopSubmit = async () => {
    try {
      if (isEdit) {
        await axios.put(`http://localhost:5000/api/laptops/${editLaptop._id}`, newLaptop);
        setMessage('Laptop updated successfully!');
      } else {
        const res = await axios.post('http://localhost:5000/api/laptops', newLaptop);
        setLaptops([...laptops, res.data]);
        setMessage('Laptop added successfully!');
      }
      resetForm();
      fetchData();
    } catch (err) {
      setError('Error handling laptop operation.');
    }
  };

  const resetForm = () => {
    setNewLaptop({ brand: '', model: '', serialNumber: '', status: 'available' });
    setIsEdit(false);
  };

  const handleDeleteLaptop = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/laptops/${id}`);
      setMessage('Laptop deleted successfully!');
      fetchData();
    } catch (err) {
      setError('Error deleting laptop.');
    }
  };

  const handleEditLaptop = (laptop) => {
    setIsEdit(true);
    setEditLaptop(laptop);
    setNewLaptop(laptop);
  };

  // Assign Laptop
  const handleAssignLaptop = async () => {
    try {
      await axios.post('http://localhost:5000/api/employee/assign-laptop', newAssignment);
      setMessage('Laptop assigned successfully!');
      setNewAssignment({ laptopId: '', employeeId: '' });
      fetchData();
    } catch (err) {
      setError('Error assigning laptop.');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Admin Dashboard</h1>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Laptop Form */}
      <h2>{isEdit ? 'Edit Laptop' : 'Add Laptop'}</h2>
      <form>
        <input
          type="text"
          placeholder="Brand"
          value={newLaptop.brand}
          onChange={(e) => setNewLaptop({ ...newLaptop, brand: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Model"
          value={newLaptop.model}
          onChange={(e) => setNewLaptop({ ...newLaptop, model: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Serial Number"
          value={newLaptop.serialNumber}
          onChange={(e) => setNewLaptop({ ...newLaptop, serialNumber: e.target.value })}
          required
        />
        <select
          value={newLaptop.status}
          onChange={(e) => setNewLaptop({ ...newLaptop, status: e.target.value })}
        >
          <option value="available">Available</option>
          <option value="assigned">Assigned</option>
          <option value="maintenance">Under Maintenance</option>
        </select>
        <button type="button" onClick={handleLaptopSubmit}>
          {isEdit ? 'Update Laptop' : 'Add Laptop'}
        </button>
      </form>

      {/* Laptop Table */}
      <h2>Laptops</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Serial Number</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {laptops.map((laptop) => (
            <tr key={laptop._id}>
              <td>{laptop.brand}</td>
              <td>{laptop.model}</td>
              <td>{laptop.serialNumber}</td>
              <td>{laptop.status}</td>
              <td>
                <button onClick={() => handleEditLaptop(laptop)}>Edit</button>
                <button onClick={() => handleDeleteLaptop(laptop._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Assignment Form */}
      <h2>Assign Laptop</h2>
      <form>
        <select
          value={newAssignment.laptopId}
          onChange={(e) => setNewAssignment({ ...newAssignment, laptopId: e.target.value })}
        >
          <option value="">Select Laptop</option>
          {laptops
            .filter((laptop) => laptop.status === 'available')
            .map((laptop) => (
              <option key={laptop._id} value={laptop._id}>
                {laptop.brand} - {laptop.model}
              </option>
            ))}
        </select>
        <select
          value={newAssignment.employeeId}
          onChange={(e) => setNewAssignment({ ...newAssignment, employeeId: e.target.value })}
        >
          <option value="">Select Employee</option>
          {employees.map((employee) => (
            <option key={employee._id} value={employee._id}>
              {employee.name} - {employee.department}
            </option>
          ))}
        </select>
        <button type="button" onClick={handleAssignLaptop}>
          Assign
        </button>
      </form>

      {/* Assignment Table */}
      <h2>Assignments</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Laptop</th>
            <th>Employee</th>
            <th>Assigned Date</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment._id}>
              <td>{assignment.laptopId}</td>
              <td>{assignment.employeeId}</td>
              <td>{new Date(assignment.assignedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
