const Results = require('./results');

const { TWO_MIN, ONE_MIN, TEN_MIN } = require('../utils/times');

const monitorings = {};

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
  // Update checkInterval value
  if (url in monitorings) {
    const monitoring = monitorings[url];
    monitoring.stopRequestTimer();
    monitoring.checkInterval = checkInterval;
    monitoring.startRequestTimer();
    return monitoring;
  }
  // Create new monitoring
  const monitoring = new Results(url, checkInterval);
  monitorings[url] = monitoring;
  return monitoring;
};

const getMonitorings = () =>
  Object.values(monitorings).map(({ checkInterval, url }) => ({
    checkInterval,
    url,
  }));

module.exports = { addMonitoring, getMonitorings };
