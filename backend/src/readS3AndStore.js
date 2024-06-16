import dotenv from 'dotenv';
import mongoose from 'mongoose';
import csv from 'csv-parser';
import s3 from './awsConfig.js';
import SensorData from './models/SensorData.js';

// Imports variables from .env file
dotenv.config({ path: '../.env' });

const bucketName = process.env.BUCKET_NAME;
// eslint-disable-next-line
console.log(`Reading bucket name from .env: ${bucketName}`);

const readCSVFromS3 = () => {
  const params = {
    Bucket: bucketName
  };

  // Fetch objects from bucket
  s3.listObjectsV2(params, (err, data) => {
    if (err) {
      // eslint-disable-next-line
      console.error('Error fetching list of files', err);
      return;
    }

    const { Contents } = data;
    Contents.forEach((file) => {
      const fileParams = {
        Bucket: bucketName,
        Key: file.Key
      };

      s3.getObject(fileParams)
        .createReadStream()
        .pipe(csv())
        .on('data', async (row) => {
          // Need to destructure each column in the Excel. There are no headings so columns need to be referred to by index
          const day = row[0];
          const timestamp = row[1];
          const temperature = parseFloat(row[2]);
          const pressure = parseFloat(row[3]);
          const humidity = parseFloat(row[4]);
          const envSensor = row[5];
          const spectV = parseFloat(row[6]);
          const spectB = parseFloat(row[7]);
          const spectG = parseFloat(row[8]);
          const spectY = parseFloat(row[9]);
          const spectD = parseFloat(row[10]);
          const spectR = parseFloat(row[11]);
          const spectSensor = row[12];
          const acx = parseFloat(row[13]);
          const acy = parseFloat(row[14]);
          const acz = parseFloat(row[15]);
          const agSensor = row[16];
          const signal = row[17];

          // Combine day and timestamp into a single Date object before saving to MongoDB
          const dateTimeString = `${day} ${timestamp}`;
          const combinedDateTime = new Date(dateTimeString);

          const sensorData = new SensorData({
            date: combinedDateTime,
            temperature,
            pressure,
            humidity,
            envSensor,
            spectV,
            spectB,
            spectG,
            spectY,
            spectD,
            spectR,
            spectSensor,
            acx,
            acy,
            acz,
            agSensor,
            signal
          });

          try {
            await sensorData.save();
            // eslint-disable-next-line
            console.log(`Successfully processed file: ${file.Key}`);
          } catch (err) {
            // eslint-disable-next-line
            console.error('Error saving sensor data', err);
          }
        })
        .on('error', (err) => {
          // eslint-disable-next-line
          console.error('Errr processing file', err);
        });
    });
  });
};

export default readCSVFromS3;
