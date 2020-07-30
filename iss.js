// Dependencies to be used

const request = require('request');


/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if ((!response.statusCode === 200)) {
      const warn = `Status code ${response.statusCode} when trying to fetch IP. Query returned: "${body}"`;
      callback(Error(warn), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

// coordinates fetching function


const fetchCoordsByIP = (ip, callback) => {
  request('https://ipvigilante.com/174.923.84.171', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const warn = `Status code ${response.statusCode} when trying to fetch coordinates. Query returned: "${body}"`;
      callback(Error(warn), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body).data;
    callback(null, { latitude, longitude } );
  });
}

module.exports = { fetchMyIP, fetchCoordsByIP };