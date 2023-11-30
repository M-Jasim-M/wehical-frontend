import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Newpasward() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleResetPassword = async () => {
    try {
      // Check if passwords match
      if (newPassword !== confirmPassword) {
        setErrorMessage('Passwords do not match');
        return;
      }

      // Extract token from the URL
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      // Send the reset token and new password to the server
      await axios.post('http://localhost:5000/api/new-password', {
        token,
        newPassword,
      });
console.log(token , newPassword);
      // Handle success, e.g., show a success message or redirect to login
      console.log('Password reset successful');
      navigate("/")
    } catch (error) {
      // Handle error, e.g., display an error message
      console.error('Error resetting password:', error.message);
      setErrorMessage('Error resetting password');
    }
  };
  
  return (
    <div>
      <h2>Reset Password</h2>
      <label>New Password:</label>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <label>Confirm Password:</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleResetPassword}>Reset Password</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default Newpasward;
