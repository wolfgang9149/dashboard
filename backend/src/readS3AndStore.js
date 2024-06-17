import { Readable } from 'stream';
import dotenv from 'dotenv';
import { ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import csv from 'csv-parser';
import SensorData from './models/SensorData.js';
import TransferredFile from './models/TransferredFile.js';
import s3Client from './s3Client.js';

// Imports variables from .env file
dotenv.config({ path: '../.env' });

const bucketName = process.env.BUCKET_NAME;

const readCSVFromS3 = async () => {
  const listParams = {
    Bucket: bucketName
  };

  try {
    // Fetch objects from bucket
    const data = await s3Client.send(new ListObjectsV2Command(listParams));

    const { Contents } = data;

    for (const file of Contents) {
      // Check if file has already been transferred
      const fileExists = await TransferredFile.findOne({ fileName: file.Key });

      if (fileExists) {
        console.log(`File ${file.Key} has already been transferred`);

        continue;
      }

      const getObjectParams = {
        Bucket: bucketName,
        Key: file.Key
      };

      const { Body } = await s3Client.send(new GetObjectCommand(getObjectParams));

      const stream = Body instanceof Readable ? Body : Readable.from(Body);

      stream
        .pipe(csv({ headers: false }))
        .on('data', async (row) => {
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

          // Combine date and time into a single Date object
          const dateTime = new Date(`${day}T${timestamp}`);

          const sensorData = new SensorData({
            dateTime,
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
            console.log(`Successfully processed row in file: ${file.Key}`);
          } catch (saveError) {
            console.error('Error saving data to MongoDB', saveError);
          }
        })
        .on('end', async () => {
          const transferredFile = new TransferredFile({ fileName: file.Key });

          await transferredFile.save();
        })
        .on('error', (err) => {
          console.log('Error processing file', err);
        });
    }
  } catch (err) {
    console.error('Error fetching list of files', err);
  }
};

export default readCSVFromS3;
