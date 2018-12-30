const { emit } = require('../data/actions');
const { TWO_MIN } = require('../utils/times');

const threshold = 0.8;

const alertsCache = [];

const alerts = {
  /* 
  url: {
    isSent: Boolean
    at: timestamp,
    availability: float,
    errorTimeoutID: int | null,
    resolvedTimeoutID: int | null,
  } */
};

const registerAlert = url => {
  const alert = alerts[url];
  // Cancel a resolution
  if (alert.resolvedTimeoutID !== null) {
    clearTimeout(alert.resolvedTimeoutID);
    alert.resolvedTimeoutID = null;
  }
  // If there is no running alerting timeout and the error isn't already sent
  if (alert.errorTimeoutID === null && !alert.isSent) {
    alert.resolvedTimeoutID = setTimeout(() => {
      const alertToSend = {
        at: Date.now(),
        url,
        availability: alert.availability,
      };
      alert.isSent = true;
      alert.errorTimeoutID = null;
      alertsCache.push(alertToSend);
      emit.alertGenerated(alertToSend);
    }, TWO_MIN);
  }
};

const resolveAlert = url => {
  const alert = alerts[url];
  // Cancel an alert
  if (alert.errorTimeoutID !== null) {
    clearTimeout(alert.errorTimeoutID);
    alert.errorTimeoutID = null;
  }
  // If alert already sent and no running resolution timeout
  if (alert.isSent && alert.resolvedTimeoutID === null) {
    alert.resolvedTimeoutID = setTimeout(() => {
      const resolutionToSend = {
        at: Date.now(),
        url,
        availability: alert.availability,
      };
      emit.alertResolved(resolutionToSend);
      alert.isSent = false;
      alert.resolvedTimeoutID = null;

      // Remove alert from cache
      const alertCacheIndex = alertsCache.findIndex(a => a.url === url);
      alertsCache.splice(alertCacheIndex, 1);
    }, TWO_MIN);
  }
};

const handleAlerts = metrics => {
  const availability = 1 - metrics.totalErrors / metrics.totalRequests;
  const url = metrics.url;
  if (!(url in alerts)) {
    alerts[url] = {
      errorTimeoutID: null,
      resolvedTimeoutID: null,
      isSent: false,
    };
  }
  alerts[url].availability = availability;
  if (availability < threshold) {
    registerAlert(url);
  } else {
    resolveAlert(url);
  }
};

const getAlerts = () => alertsCache;

module.exports = { handleAlerts, getAlerts };
