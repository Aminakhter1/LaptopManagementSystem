import { useEffect, useState } from 'react';
import axios from 'axios';

const ManageLaptops = () => {
  const [laptops, setLaptops] = useState([]);
  const [newLaptop, setNewLaptop] = useState({ brand: '', model: '', serialNumber: '', purchaseDate: '' });

  useEffect(() => {
    fetchLaptops();
  }, []);

  const fetchLaptops = async () => {
    const res = await axios.get('http://localhost:5000/api/laptops', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setLaptops(res.data);
  };

  const addLaptop = async () => {
    await axios.post('http://localhost:5000/api/laptops', newLaptop, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    fetchLaptops();
  };

  return (
    <div>
      <h2>Manage Laptops</h2>
      <input type="text" placeholder="Brand" onChange={(e) => setNewLaptop({ ...newLaptop, brand: e.target.value })} />
      <input type="text" placeholder="Model" onChange={(e) => setNewLaptop({ ...newLaptop, model: e.target.value })} />
      <input type="text" placeholder="Serial Number" onChange={(e) => setNewLaptop({ ...newLaptop, serialNumber: e.target.value })} />
      <input type="date" onChange={(e) => setNewLaptop({ ...newLaptop, purchaseDate: e.target.value })} />
      <button onClick={addLaptop}>Add Laptop</button>

      <ul>
        {laptops.map((laptop) => (
          <li key={laptop._id}>
            {laptop.brand} {laptop.model} ({laptop.status})
            <button onClick={() => axios.delete(`http://localhost:5000/api/laptops/${laptop._id}`)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageLaptops;
