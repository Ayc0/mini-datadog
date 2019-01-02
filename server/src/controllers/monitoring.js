const { Metrics } = require('./metrics');

const { ONE_MIN, TEN_MIN } = require('../utils/times');

const monitorings = {};

const trim = string =>
  string.replace(/^[\s\uFEFF\xA0/]+|[\s\uFEFF\xA0/]+$/g, '');

const addMonitoring = ({ url, minutes = 0, seconds = 0, millis = 0 }) => {
  let checkInterval = (minutes * 60 + seconds) * 1000 + millis;
  if (checkInterval <= 0) {
    // default is 60'
    checkInterval = ONE_MIN;
  }
  // max is 10'
  if (checkInterval > TEN_MIN) {
    checkInterval = TEN_MIN;
  }

  url = trim(url);

  if (!url.match(/^https?:\/\//)) {
    url = `http://${url}`;
  }

  // Update checkInterval value
  if (url in monitorings) {
    const monitoring = monitorings[url];
    monitoring.stopRequestTimer();
    monitoring.checkInterval = checkInterval;
    monitoring.startRequestTimer();
    return monitoring;
  }
  // Create new monitoring
  const monitoring = new Metrics(url, checkInterval);
  monitorings[url] = monitoring;
  return monitoring;
};

const getMonitorings = () =>
  Object.values(monitorings).map(({ checkInterval, url }) => ({
    checkInterval,
    url,
  }));

module.exports = { addMonitoring, getMonitorings };
