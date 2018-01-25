const axios = require('axios');

const APPID = 'c679a2284718a3fc54d075ceb57a81ab';

function weatherUrl(city) {
  return `http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
    city,
  )}&units=imperial&APPID=${APPID}`;
}

const url = weatherUrl('Paris');

const request = { url };
const promise = axios(request);

// const promise = axios({ url: 'http://knowthen.com/fp12' });
promise.then(success, error);
// axios(request).then(success, error);

function success(response) {
  console.log(JSON.stringify(response.data, null, 2));
}

function error(err) {
  console.log(JSON.stringify(err.response.data, null, 2));
}
