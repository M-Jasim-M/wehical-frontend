import React, { useState } from 'react';
import './Createaccount.css';
import axios from 'axios';

function Createaccount() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    image: null,
    isAdmin: 'client', // Set the default value for isAdmin
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('phoneNumber', formData.phoneNumber);
    data.append('image', formData.image);
    data.append('isAdmin', formData.isAdmin); // Include isAdmin in the form data

    try {
      await axios.post('http://localhost:5000/api/create', data);
      console.log('User created successfully');
      alert('success');
    } catch (error) {
      console.error('Error creating user:', error.message);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" onChange={handleInputChange} />
          </label>
          <br />
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
          <label>
            Phone Number:
            <input type="tel" name="phoneNumber" onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Image:
            <input type="file" name="image" onChange={handleFileChange} />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default Createaccount;
