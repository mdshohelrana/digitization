const AWS = require('aws-sdk');

// Configure AWS SDK with credentials
AWS.config.loadFromPath('./config/awsConfig.json');

const s3 = new AWS.S3();

const uploadToS3 = async (file) => {
    const params = {
        Bucket: 'YOUR_BUCKET_NAME',
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype
    };

    return s3.upload(params).promise();
};

module.exports = {
    uploadToS3
};
