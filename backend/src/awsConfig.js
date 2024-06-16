import dotenv from 'dotenv';
import AWS from 'aws-sdk';

// Imports variables from .env file
dotenv.config({ path: '../.env' });

// Configure AWS with access and secret key
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SACCESS_KEY,
  region: process.env.BUCKET_REGION
});

const s3 = new AWS.S3();

export default s3;
