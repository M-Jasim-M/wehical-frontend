import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FuelHistory() {
  const [fuelHistory, setFuelHistory] = useState([]);

  useEffect(() => {
    const fetchFuelHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/fuel-history');
        console.log(response.data);
        setFuelHistory(response.data);
      } catch (error) {
        console.error('Error fetching fuel history:', error.message);
      }
    };

    fetchFuelHistory();
  }, []);

  return (
    <div>
      <h2>Fuel History</h2>
      <ul>
        {fuelHistory.map((fuelRecord) => (
          <li key={fuelRecord._id}>
            <strong>User:</strong> {fuelRecord.user && fuelRecord.user.name},{fuelRecord.user && fuelRecord.user.email} <strong>Wehical:</strong> {fuelRecord.wehical.plateNumber}, <strong>Date:</strong> {fuelRecord.date}, <strong>Total Liters:</strong> {fuelRecord.totalLiters}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FuelHistory;


// app.get('/fuel-history', async (req, res) => {
//   try {
//     const fuelHistory = await FuelingDetail.find()
//       .populate('user')
//       .populate('wehical');

//     res.json(fuelHistory);
//   } catch (error) {
//     console.error('Error fetching fuel history:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });