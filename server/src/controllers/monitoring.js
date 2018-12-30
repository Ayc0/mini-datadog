const Results = require('./results');

const monitorings = {};

const addMonitoring = ({ url, minutes = 0, seconds = 0, millis = 0 }) => {
  let checkInterval = (minutes * 60 + seconds) * 1000 + millis;
  if (checkInterval === 0) {
    // default is 60'
    checkInterval = 60000;
  }
  // max is 10'
  if (checkInterval > 600000) {
    checkInterval = 600000;
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
