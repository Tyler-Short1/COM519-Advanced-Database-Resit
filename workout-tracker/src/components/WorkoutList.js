import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WorkoutItem from './WorkoutItem';

const WorkoutList = () => {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        axios.get('http://192.168.0.15:3002/workouts')
            .then((response) => {
                setWorkouts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching workouts:', error);
                // Handle error case
            });
    }, []);

    console.log(workouts); // Log the response data

    const handleDelete = (workoutId) => {
        // Delete the workout from the server
        axios.delete(`/workouts/${workoutId}`)
            .then(() => {
                // Filter out the deleted workout from the list
                const updatedWorkouts = workouts.filter((workout) => workout._id !== workoutId);
                setWorkouts(updatedWorkouts);
            })
            .catch((error) => {
                console.error('Error deleting workout:', error);
            });
    };

    return (
        <div>
            <h2>Workouts</h2>
            {workouts.map((workout) => (
                <WorkoutItem
                    key={workout._id}
                    workout={workout}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
};

export default WorkoutList;
