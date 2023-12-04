
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserList from './Wehicaluser';

function Dashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, []);

  const addUser = () => {
    navigate('/createaccount');
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/use/${userId}`);
      const updatedUsers = users.filter(user => user._id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  const updateUser = (user) => {
    alert(user._id);
    setSelectedUser(user);
    // Display the update form or navigate to an update route
    // based on your application structure
  };

  const handleUpdate = async (updatedUserData) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/use/${selectedUser._id}`, updatedUserData);
      const updatedUsers = users.map(user =>
        user._id === selectedUser._id ? response.data.user : user
      );
      setUsers(updatedUsers);
      // Reset selectedUser state after successful update
      setSelectedUser(null);
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };

  const assignWehical = (user) => {
    // Extract user ID
    const userId = user._id;
  
    // Navigate to the '/assignweh' route with user ID
    navigate(`/assignweh?userId=${userId}`);
  };





  return (
    <>
      <div>
        <h2>User List</h2>
        <ul>
          {users.map(user => (
            <li key={user._id}>
              {user.name} - {user.email} <br />
              {user.image && (
                <img
                  src={`http://localhost:5000/uploads/${user.image}`}
                  alt={user.name}
                  style={{ width: '50px', height: '50px' }}
                />
              )}
              <button onClick={() => deleteUser(user._id)}>Delete user</button>
              <button onClick={() => updateUser(user)}>Update user</button>
              {user.wehical ? (
                <button>Wehical Assigned</button>
              ) : (
                <button onClick={() => assignWehical(user)}>Assign wehical</button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <br />
      <button onClick={addUser}>Add user</button>
<br /> <br />

<UserList/>

      {/* Update Form */}
      {selectedUser && (
        <div>
          <h2>Update User</h2>
          {/* Create a form with fields to update user details */}
          {/* Include input fields for name, email, etc., and a submit button */}
          {/* Ensure to handle form submission and call handleUpdate with updated data */}
        </div>
      )}
    </>
  );
}

export default Dashboard;
