import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Area } from 'recharts';

function UserRegistrationChart() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:5000/api/users')
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API response is an array of user objects with 'name' and 'registrationDate' properties
        const userCountData = data.map((user) => ({
          date: user.registrationDate, // Assuming registrationDate is a property in your user object
          userCount: 1, // You might want to adjust this based on your data
        }));

        setUserData(userCountData);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  return (
    <ResponsiveContainer width="100%" aspect={3}>
      <AreaChart
        width={500}
        height={300}
        data={userData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="userCount" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default UserRegistrationChart;
