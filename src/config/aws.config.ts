import { config } from 'aws-sdk';

export const setupS3Configs = () => {
  config.update({
    accessKeyId: process.env.ENV_AWS_ACCESS_KEY,
    secretAccessKey: process.env.ENV_AWS_SECRET_KEY,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
  });
};
