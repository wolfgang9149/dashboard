import dotenv from 'dotenv';
import AWS from 'aws-sdk';
import { S3 } from '@aws-sdk/client-s3';

// Imports variables from .env file
dotenv.config({ path: '../.env' });

// Configure AWS with access and secret key
// JS SDK v3 does not support global configuration.
// Codemod has attempted to pass values to each service client in this file.
// You may need to update clients outside of this file, if they use global config.
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SACCESS_KEY,
  region: process.env.BUCKET_REGION
});

const s3 = new S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SACCESS_KEY
  },

  region: process.env.BUCKET_REGION
});

export default s3;
