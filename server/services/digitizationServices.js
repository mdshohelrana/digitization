const axios = require('axios');

const service1Url = 'http://service1.url';
const service2Url = 'http://service2.url';
const service3Url = 'http://service3.url';

async function processThroughService1(fileLink) {
    const response = await axios.post(service1Url, { fileLink });
    return response.data.newFileLink;
}

async function processThroughService2(fileLink) {
    const response = await axios.post(service2Url, { fileLink });
    return response.data.newFileLink;
}

async function processThroughService3(fileLink) {
    const response = await axios.post(service3Url, { fileLink });
    return response.data.newFileLink;
}

module.exports = {
    processThroughService1,
    processThroughService2,
    processThroughService3
};
