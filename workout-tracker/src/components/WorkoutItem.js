import React from 'react';

const WorkoutItem = ({ workout, onDelete }) => {
    const handleDelete = () => {
        // Call the parent component's onDelete callback with the workout ID
        onDelete(workout._id);
    };

    return (
        <div>
            <h3>{workout.title}</h3>
            <p>Date: {workout.date}</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default WorkoutItem;