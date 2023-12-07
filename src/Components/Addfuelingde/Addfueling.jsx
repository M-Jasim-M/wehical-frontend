import React, { useState } from 'react';
import axios from 'axios';

const FuelingForm = () => {
    const userId = new URLSearchParams(window.location.search).get('userId');
    const wehicalId = new URLSearchParams(window.location.search).get('wehicalId');

    // Log the extracted values
    console.log('User ID:', userId);
    console.log('Wehical ID:', wehicalId);

    const [formData, setFormData] = useState({
        userId: userId,
        wehicalId: wehicalId,
        stationName: '',
        pricePerLiter: '',
        totalLiters: '',
        totalPrice: '',
        location: '',
        date: '', // New date input field
        image: null,
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataForApi = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataForApi.append(key, value);
        });

        try {
            
            await axios.post(`http://localhost:5000/api/fueling/add-fueling/${userId}`, formDataForApi);
            console.log('Fueling data submitted successfully' + formDataForApi);
        } catch (error) {
            console.error('Error submitting fueling data:', error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="stationName" placeholder="Station Name" onChange={handleInputChange} />
            <input type="text" name="pricePerLiter" placeholder="Price Per Liter" onChange={handleInputChange} />
            <input type="text" name="totalLiters" placeholder="Total Liters" onChange={handleInputChange} />
            <input type="text" name="totalPrice" placeholder="Total Price" onChange={handleInputChange} />
            <input type="text" name="location" placeholder="Location" onChange={handleInputChange} />

            {/* Add date input field */}
            <input type="date" name="date" onChange={handleInputChange} />

            <input type="file" name="image" onChange={handleImageChange} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default FuelingForm;
