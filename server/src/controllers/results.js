const interval = require('@libshin/interval');

const axios = require('../utils/axios');
const { emit } = require('../utils/actions');

const { TEN_SEC, ONE_MIN, TEN_MIN, ONE_HOUR } = require('../utils/times');

const round = number => parseInt(number, 10);

class Results {
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
    this.tenMinTimer = interval(this.summary(true), ONE_MIN);
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
    this.results.push({
      instant,
      status,
      duration,
    });

    // Don't keep results generate more than 10min ago
    const tenMinAgo = instant - TEN_MIN;
    const tenMinIndex = Math.max(
      this.results.findIndex(results => results.instant > tenMinAgo),
      0,
    );
    this.results.splice(0, tenMinIndex);
  }

  summary(fast = false) {
    const lookupDuration = fast ? TEN_MIN : ONE_HOUR; // 10min or 1h
    return () => {
      const instant = Date.now();
      const beforeInstant = instant - lookupDuration;
      // We duplicate the results to avoid having a new response that could modify the list
      const results = this.results.filter(
        result => result.instant > beforeInstant,
      );
      // Sort by ascending duration
      results.sort((a, b) => a.duration - b.duration);
      const [totalDuration, totalErrors, differentStatuses] = results.reduce(
        ([total, errors, statuses], { duration, status }) => {
          let isError = 0;
          if (status instanceof Error) {
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
      const data = {
        url: this.url,
        lookupDuration,
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
      emit.resultsPerformed(data);
    };
  }
}

module.exports = Results;
