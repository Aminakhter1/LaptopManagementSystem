import { useState, useEffect } from 'react';
import axios from 'axios';

const AssignLaptops = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedLaptop, setSelectedLaptop] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await axios.get('http://localhost:5000/api/employees', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setEmployees(res.data);
  };

  const assignLaptop = async () => {
    await axios.post(
      'http://localhost:5000/api/employees/assign',
      { laptopId: selectedLaptop, employeeId: selectedEmployee },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
  };

  return (
    <div>
      <h2>Assign Laptop</h2>
      <select onChange={(e) => setSelectedEmployee(e.target.value)}>
        {employees.map((emp) => (
          <option key={emp._id} value={emp._id}>
            {emp.name}
          </option>
        ))}
      </select>
      <button onClick={assignLaptop}>Assign</button>
    </div>
  );
};

export default AssignLaptops;
