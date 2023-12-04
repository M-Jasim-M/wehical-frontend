import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Assignweh = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = new URLSearchParams(location.search).get('userId');

  const [wehicalData, setWehicalData] = useState({
    // Define fields for the wehical form
    vehicleType: '',
    plateNumber: '',
    // ... other fields
  });

  const handleAssignWehical = async () => {
    try {
      // Send a request to your backend API to assign the wehical
      await fetch(`http://localhost:5000/api/assignwehical/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(wehicalData),
      });

      // Navigate back to the user list or any other route
      navigate('/admain-dash');
    } catch (error) {
      console.error('Error assigning wehical:', error.message);
    }
  };

  return (
    <div>
      <h2>Assign Wehical to User</h2>
      <form>
        {/* Wehical form fields */}
        <label>
          Vehicle Type:
          <input
            type="text"
            value={wehicalData.vehicleType}
            onChange={(e) => setWehicalData({ ...wehicalData, vehicleType: e.target.value })}
          />
        </label>
        <br />

        <label>
          Plate Number:
          <input
            type="text"
            value={wehicalData.plateNumber}
            onChange={(e) => setWehicalData({ ...wehicalData, plateNumber: e.target.value })}
          />
        </label>
        <br />

        {/* ... other wehical form fields */}
        
        <button type="button" onClick={handleAssignWehical}>
          Assign Wehical
        </button>
      </form>
    </div>
  );
};

export default Assignweh;
