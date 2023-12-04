import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users-with-wehical');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users with wehical data:', error.message);
      }
    };

    fetchUsers();
  }, []);

  const deleteWehicalFromUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete-wehical-from-user/${userId}`);
      // Fetch the updated user list after deletion
      const response = await axios.get('http://localhost:5000/users-with-wehical');
      setUsers(response.data);
    } catch (error) {
      console.error('Error deleting wehical from user:', error.message);
    }
  };

  const viewFuel = (userId) => {
    navigate(`/fulling?userId=${userId}`);
  };

  return (
    <div>
      <h2>User List with Wehical Data</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
            {user.wehical && (
              <p>
                Wehical Data: {user.wehical.vehicleType} - {user.wehical.plateNumber}
                <button onClick={() => deleteWehicalFromUser(user._id)}>Delete Wehical</button>
                <button onClick={() => viewFuel(user._id)}>View</button>
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
