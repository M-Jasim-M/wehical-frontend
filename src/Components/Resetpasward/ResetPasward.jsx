import React, { useState } from 'react';
import axios from 'axios';

function ResetPasward() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetRequest = async () => {
    try {
      await axios.post('http://localhost:5000/api/reset-password', { email });
      alert('Password reset email sent. Check your inbox.');
    } catch (error) {
      console.error('Error requesting password reset:', error.response.data.error);
      alert('Error requesting password reset. Please try again.');
    }
  };

  return (
    <div>
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <button onClick={handleResetRequest}>Request Password Reset</button>
    </div>
  );
}

export default ResetPasward;
