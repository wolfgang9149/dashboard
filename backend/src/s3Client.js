import dotenv from 'dotenv';
import { S3Client } from '@aws-sdk/client-s3';

// Imports variables from .env file
dotenv.config({ path: '../.env' });

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SACCESS_KEY
  },
  region: process.env.BUCKET_REGION
});

export default s3Client;
