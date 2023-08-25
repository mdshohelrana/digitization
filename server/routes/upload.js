const express = require('express');
const multer = require('multer');
const axios = require('axios');
const router = express.Router();

const storage = multer.memoryStorage();  // stores the file as a buffer in memory
const upload = multer({ storage: storage });

const { uploadToS3 } = require('../utils/awsUtils');
const {
    processThroughService1,
    processThroughService2,
    processThroughService3
} = require('../services/digitizationServices');

router.post('/', upload.single('file'), async (req, res, next) => {
    try {
        const file = req.file;
        const s3FileLink = await uploadToS3(file); // Assuming it returns the file link after upload

        let processedFileLink = await processThroughService1(s3FileLink);
        processedFileLink = await processThroughService2(processedFileLink);
        processedFileLink = await processThroughService3(processedFileLink);

        // Now retrieve the processed file and send to the client
        const response = await axios.get(processedFileLink, { responseType: 'stream' });

        // Setting the appropriate headers
        res.setHeader('Content-Type', response.headers['content-type']);
        res.setHeader('Content-Disposition', 'attachment; filename=processed-file.ext'); // Replace 'ext' with the actual file extension if known

        // Piping the file stream directly to the client
        response.data.pipe(res);

    } catch (error) {
        next(error);
    }
});

module.exports = router;
