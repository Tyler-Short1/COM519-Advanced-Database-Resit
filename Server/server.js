const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const { MongoClient } = require('mongodb');

// Middleware
app.use(cors());

// Middleware to parse request bodies as JSON
app.use(bodyParser.json());

// MongoDB driver setup
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb+srv://admin:admin123@cluster0.h6hkh9t.mongodb.net/workoutDB'
// const url = 'mongodb+srv://admin:admin123@cluster0.h6hkh9t.mongodb.net/?retryWrites=true&w=majority'
const dbName = 'workoutDB';

// Connect to MongoDB server and establish a database connection
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect()
    .then(() => {
        const db = client.db(dbName);

        // Create a new workout
        app.post('/workouts', (req, res) => {
            const workout = {
                title: req.body.title,
                date: req.body.date,
            };

            const collection = db.collection('workouts');
            collection.insertOne(workout, (err, result) => {
                if (err) {
                    res.status(500).send('Error creating workout:', err);
                    return;
                }
                res.status(201).send('Workout created successfully');
            });
        });

        // Get all workouts
        app.get('/workouts', (req, res) => {
            const collection = db.collection('workouts');
            collection.find().toArray((err, workouts) => {
                if (err) {
                    res.status(500).send('Error retrieving workouts:', err);
                    return;
                }
                res.json(workouts);
            });
        });

        // Update a workout
        app.put('/workouts/:id', (req, res) => {
            const workoutId = req.params.id;
            const workoutUpdates = {
                $set: {
                    title: req.body.title,
                    date: req.body.date,
                },
            };

            const collection = db.collection('workouts');
            collection.updateOne({ _id: ObjectId(workoutId) }, workoutUpdates, (err, result) => {
                if (err) {
                    res.status(500).send('Error updating workout:', err);
                    return;
                }
                res.send('Workout updated successfully');
            });
        });

        // Delete a workout
        app.delete('/workouts/:id', (req, res) => {
            const workoutId = req.params.id;

            const collection = db.collection('workouts');
            collection.deleteOne({ _id: ObjectId(workoutId) }, (err, result) => {
                if (err) {
                    res.status(500).send('Error deleting workout:', err);
                    return;
                }
                res.send('Workout deleted successfully');
            });
        });

        // Start the server
        const port = 3002;
        app.listen(port, '0.0.0.0', () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
