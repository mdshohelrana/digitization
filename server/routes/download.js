const express = require('express');
const AWS = require('aws-sdk');
const router = express.Router();
const passport = require('passport');

// AWS configuration
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION // E.g., 'us-west-2'
});

router.get('/:filename', (req, res) => {
    const filename = req.params.filename;

    // Set up S3 get parameters
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: filename
    };

    s3.getObject(params, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error occurred while trying to retrieve file from S3.');
        }

        // Set the appropriate headers for download
        res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-Type', data.ContentType);

        // Send the file data
        res.send(data.Body);
    });
});

module.exports = router;
