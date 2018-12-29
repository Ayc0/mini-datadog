const monitorings = {};

const addMonitoring = ({
  url,
  hours = 0,
  minutes = 10,
  seconds = 0,
  millis = 0,
}) => {
  const checkInterval = ((hours * 60 + minutes) * 60 + seconds) * 1000 + millis;
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
