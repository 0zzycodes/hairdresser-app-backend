const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'mapquest',
  httpAdapter: 'https',
  apiKey: 'v2g3eQvVgG3fhHmyKdRBVwSG2OOAQT5O',
  formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;