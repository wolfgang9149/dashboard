import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import readCSVFromS3 from './readS3AndStore.js';
import missionRouter from './routes/mission_routes.js';
//config
dotenv.config({});
//connecting database
connectDB();

const app = express();
const PORT = process.env.PORT;
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Use mission_routes.js
app.use('/mission', missionRouter);
// This route will check for any new files in AWS S3 and transfer the data to MongoDB
app.get('/process-data', (req, res) => {
  readCSVFromS3();
  res.send('Data processing started.');
});

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});

