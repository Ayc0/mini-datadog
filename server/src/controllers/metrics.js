const interval = require('@libshin/interval');

const axios = require('../utils/axios');
const { emit } = require('../data/actions');

const { TEN_SEC, ONE_MIN, TEN_MIN, ONE_HOUR } = require('../utils/times');

const round = number => parseInt(number, 10);

const computeMetrics = results => {
  if (results.length === 0) {
    return null;
  }
  const [totalDuration, totalErrors, differentStatuses] = results.reduce(
    ([total, errors, statuses], { duration, status }) => {
      let isError = 0;
      if (status.error) {
        isError = 1;
      } else if (status in statuses) {
        statuses[status] += 1;
      } else {
        statuses[status] = 1;
      }
      return [total + duration, errors + isError, statuses];
    },
    [0, 0, {}],
  );
  const maxStatus = Math.max(...Object.values(differentStatuses));
  const mostFrequentStatus = parseInt(
    Object.keys(differentStatuses).find(
      status => differentStatuses[status] === maxStatus,
    ),
    10,
  );
  return {
    mostFrequentStatus,
    totalRequests: results.length,
    totalDuration,
    totalErrors,
    averageServiceTime: round(totalDuration / results.length),
    p50ServiceTime: results[round(results.length * 0.5)].duration,
    p90ServiceTime: results[round(results.length * 0.9)].duration,
    p95ServiceTime: results[round(results.length * 0.95)].duration,
    maxServiceTime: results[results.length - 1].duration,
  };
};

class Metrics {
  constructor(url, checkInterval) {
    // Bind functions in order to make "this." work consistently
    this.startRequestTimer = this.startRequestTimer.bind(this);
    this.stopRequestTimer = this.stopRequestTimer.bind(this);
    this.stopTimers = this.stopTimers.bind(this);
    this.performRequest = this.performRequest.bind(this);
    this.saveResponse = this.saveResponse.bind(this);
    this.summary = this.summary.bind(this);

    this.url = url;
    this.checkInterval = checkInterval;
    this.requestTimer = null;
    this.twoMinTimer = interval(this.summary(true), TEN_SEC);
    this.tenMinTimer = interval(this.summary(false), ONE_MIN);
    this.results = [];

    this.startRequestTimer();
    this.twoMinTimer.start();
    this.tenMinTimer.start();
  }

  startRequestTimer() {
    this.stopRequestTimer();
    this.requestTimer = interval(this.performRequest, this.checkInterval);
    this.requestTimer.startNow();
  }

  stopRequestTimer() {
    if (this.requestTimer) {
      this.requestTimer.stop();
      this.requestTimer = null;
    }
  }

  stopTimers() {
    this.stopRequestTimer();
    if (this.twoMinTimer) {
      this.twoMinTimer.stop();
    }
    if (this.tenMinTimer) {
      this.tenMinTimer.stop();
    }
    this.twoMinTimer = null;
    this.tenMinTimer = null;
  }

  performRequest() {
    axios(this.url)
      .then(res => this.saveResponse(res.status, res.duration))
      .catch(err => this.saveResponse(new Error(), err.duration));
  }

  saveResponse(status, duration) {
    const instant = Date.now();
    const result = {
      at: instant,
      status: status instanceof Error ? 0 : status,
      error: status instanceof Error,
      duration,
    };
    emit.receiveRequest(result);
    this.results.push(result);

    // Don't keep results generate more than 1hour ago
    const oneHourAgo = instant - ONE_HOUR;
    const oneHourIndex = Math.max(
      this.results.findIndex(results => results.at > oneHourAgo),
      0,
    );
    this.results.splice(0, oneHourIndex);
  }

  summary(fast = false) {
    const lookupDuration = fast ? TEN_MIN : ONE_HOUR; // 10min or 1h
    return () => {
      const instant = Date.now();
      const beforeInstant = instant - lookupDuration;

      // We duplicate the results to avoid having a new response that could modify the list
      const results = this.results.filter(result => result.at > beforeInstant);
      if (results.length === 0) {
        return;
      }

      const lastResult = results[results.length - 1];

      // Sort by ascending duration
      results.sort((a, b) => a.duration - b.duration);

      let metrics = computeMetrics(results);

      metrics = {
        url: this.url,
        at: instant,
        lookupDuration,
        ...metrics,
        lastStatus: lastResult.status,
        lastWasError: lastResult.error,
      };

      emit.metricsPerformed(metrics);
    };
  }
}

module.exports = Metrics;
