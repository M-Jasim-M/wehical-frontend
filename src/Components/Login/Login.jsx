import React, { useState } from 'react';
import './Login.css'; // Assuming you have your styling in a separate file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    // userType: 'client', // Default to client
  });

  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/login', loginData);
  //     console.log(response.data.user);
  // console.log(response.data.user.isAdmin);

  const { token, user } = response.data;

  // Store the token and user data in localStorage or wherever needed
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));

  // Log the token and user data to the console
  console.log('Token:', token);
  console.log('User Data:', user);
      if (user.isAdmin === 'client') {
        alert("client login")
        navigate("/client-dash")
      }else{
        alert("admain login")
        navigate("/admain-dash")
      }
  
    } catch (error) {
      alert(error.response.data.error)
      console.error('Error during login:', error.response.data.error);
      // Handle other errors, display a message, or redirect as needed
    }
  };
  
const gotoemail = ()=>{
  navigate("/resetemail")
}


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" onChange={handleInputChange} />
        </label>
        <br />
        {/* <label>
          User Type:
          <label>
            <input
              type="radio"
              name="userType"
              value="client"
              checked={loginData.userType === 'client'}
              onChange={handleInputChange}
            />
            Client
          </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="admin"
              checked={loginData.userType === 'admin'}
              onChange={handleInputChange}
            />
            Admin
          </label>
        </label> */}
        <br />
        <button onClick={gotoemail}>reset passward</button>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
