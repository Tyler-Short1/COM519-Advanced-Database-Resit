import React, { useState } from 'react';
import axios from 'axios';

function WorkoutForm() {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const workout = {
            title: title,
            date: date
        };

        axios.post('http://192.168.0.15:3002/workouts', workout, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                console.log(response.data);
                // Perform any additional actions after the workout is successfully added
            })
            .catch((error) => {
                console.error('Error adding workout:', error);
                // Handle error case
            });

        setTitle('');
        setDate('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={handleTitleChange} placeholder="Workout Title" />
            <input type="text" value={date} onChange={handleDateChange} placeholder="Workout Date" />
            <button type="submit">Add Workout</button>
        </form>
    );
}

export default WorkoutForm;
