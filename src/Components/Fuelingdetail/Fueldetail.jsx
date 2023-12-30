// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Fueldetail() {
//   // Get the user ID from the URL
//   const userId = new URLSearchParams(window.location.search).get('userId');

//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         // Check if userId is available
//         if (!userId) {
//           setError('User ID not provided');
//           return;
//         }

//         // Make a GET request to fetch user data based on the user ID
//         const response = await axios.get(`http://localhost:5000/api/userweh/${userId}`);
//         setUser(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error('Error fetching user data:', error.message);
//         setError('Error fetching user data');
//       }
//     };

//     // Call the fetchUserData function when the component mounts
//     fetchUserData();
//   }, [userId]); // Include userId in the dependency array to re-fetch data when it changes

//   return (
//     <div>
//       <h2>User Details</h2>
//       {error ? (
//         <p>{error}</p>
//       ) : user ? (
//         <div>
//           <p>Name: {user.name}</p>
//           <p>Email: {user.email}</p>
//           {user.wehical && (
//             <div>
//               <p>Wehical Data:</p>
//               <p>Vehicle Type: {user.wehical.vehicleType}</p>
//               <p>Plate Number: {user.wehical.plateNumber}</p>
//             </div>
//           )}
//           {user.fuelHistory && (
//             <div>
//               <p>Fuel History:</p>
//               {user.fuelHistory.map((fuelEntry, index) => (
//                 <div key={index}>
//                   <p>Station Name: {fuelEntry.stationName}</p>
//                   <p>Price Per Liter: {fuelEntry.pricePerLiter}</p>
//                   <p>Price Per Liter: {fuelEntry.date}</p>
//                   <img  src={`http://localhost:5000/uploads/${fuelEntry.image}`} alt="" />
//                   {/* Add other fuel history fields as needed */}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

// export default Fueldetail;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

function Fueldetail() {
  // Get the user ID from the URL
  const userId = new URLSearchParams(window.location.search).get('userId');

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if userId is available
        if (!userId) {
          setError('User ID not provided');
          return;
        }

        // Make a GET request to fetch user data based on the user ID
        const response = await axios.get(`http://localhost:5000/api/userweh/${userId}`);
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        setError('Error fetching user data');
      }
    };

    // Call the fetchUserData function when the component mounts
    fetchUserData();
  }, [userId]); // Include userId in the dependency array to re-fetch data when it changes

  // Prepare data for the chart
  const chartData = {
    labels: user?.fuelHistory.map((fuelEntry) => fuelEntry.stationName) || [],
    datasets: [
      {
        label: 'Price Per Liter',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: user?.fuelHistory.map((fuelEntry) => fuelEntry.pricePerLiter) || [],
      },
    ],
  };

  return (
    <div>
      <h2>User Details</h2>
      {error ? (
        <p>{error}</p>
      ) : user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {user.wehical && (
            <div>
              <p>Wehical Data:</p>
              <p>Vehicle Type: {user.wehical.vehicleType}</p>
              <p>Plate Number: {user.wehical.plateNumber}</p>
            </div>
          )}
          {user.fuelHistory && (
            <div>
              <p>Fuel History:</p>
              {user.fuelHistory.map((fuelEntry, index) => (
                <div key={index}>
                  <p>Station Name: {fuelEntry.stationName}</p>
                  <p>Price Per Liter: {fuelEntry.pricePerLiter}</p>
                  <p>Date: {fuelEntry.date}</p>
                  <img
                    src={`http://localhost:5000/uploads/${fuelEntry.image}`}
                    alt={`Fueling Image ${index + 1}`}
                  />
                  {/* Add other fuel history fields as needed */}
                </div>
              ))}
            </div>
          )}
          {/* {user.fuelHistory && (
            <div>
              <h2>Fuel History Chart</h2>
              <Bar
                data={chartData}
                width={100}
                height={50}
                options={{
                  maintainAspectRatio: false,
                }}
              />
            </div>
          )} */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Fueldetail;
