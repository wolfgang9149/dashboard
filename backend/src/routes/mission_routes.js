import express from 'express';
import dotenv from 'dotenv';
import SensorData from '../models/SensorData.js';

// Imports variables from .env file
dotenv.config();

const router = express.Router();

// Get all data request route
router.get('/data', async (request, response) => {
  try {
    // Retrieve all data points
    const sensorData = await SensorData.find();
    response.json(sensorData);
  } catch (err) {
    // eslint-disable-next-line
    console.error('Error fetching data', err);
    response.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/data/temp', async (request, response) => {
  try {
    // Retrieve all data points
    const sensorData = await SensorData.find({}, ['temperature', 'dateTime']);
    response.json(sensorData);
  } catch (err) {
    // eslint-disable-next-line
    console.error('Error fetching data', err);
    response.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
