const monitorings = {};

const addMonitoring = ({ url, minutes = 1, seconds = 0, millis = 0 }) => {
  let checkInterval = (minutes * 60 + seconds) * 1000 + millis;
  // max is 10'
  if (checkInterval > 600000) {
    checkInterval = 600000;
  }
  if (url in monitorings) {
    const monitoring = monitorings[url];
    monitoring.checkInterval = checkInterval;
    return monitoring;
  }
  const monitoring = { url, checkInterval };
  monitorings[url] = monitoring;
  return monitoring;
};

const getMonitorings = () => Object.values(monitorings);

module.exports = { addMonitoring, getMonitorings };
