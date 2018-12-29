const axios = require('axios');

const response = res => {
  res.config.metadata.endTime = new Date();
  res.duration = res.config.metadata.endTime - res.config.metadata.startTime;
  return res;
};

axios.interceptors.request.use(
  config => {
    config.metadata = { startTime: new Date() };
    return config;
  },
  error => Promise.reject(error),
);
axios.interceptors.response.use(response, err => Promise.reject(response(err)));

module.exports = axios;
