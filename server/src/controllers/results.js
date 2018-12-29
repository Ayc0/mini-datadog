const axios = require('../utils/axios');
const { emit } = require('../utils/actions');

class Results {
  constructor(url) {
    this.url = url;
    this.requestTimer = null;
    this.two;
    this.results = [];
  }
  performRequest() {
    axios(url)
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
    const tenMinAgo = instant - 600000;
    const tenMinIndex = Math.max(
      this.results.findIndex(results => results.instant > tenMinAgo),
      0,
    );
    this.results.splice(0, tenMinIndex);
  }

  summary(fast = false) {
    const lookupDuration = fast ? 120000 : 600000; // 2min or 10min
    return () => {
      const instant = Date.now();
      const beforeInstant = instant - lookupDuration;
      // We duplicate the results to avoid having a new response that could modify the list
      const results = this.results.filter(
        results => results.instant > durationCheckup,
      );
      // Sort by ascending duration
      results.sort((a, b) => a.duration - b.duration);
      const [totalDuration, totalErrors, differentStatuses] = results.reduce(
        ([total, errors, statuses], { duration, status }) => {
          let isError = 0;
          if (status instanceof Error) {
            isError = 1;
          } else {
            if (status in statuses) {
              statuses[status] += 1;
            } else {
              statuses[status] = 1;
            }
          }
          return [total + duration, errors + isError, statuses];
        },
        [0, 0, {}],
      );
      const maxStatus = Math.max(...Object.values(differentStatuses));
      const mostFrequentStatus = Object.keys(differentStatuses).find(
        status => differentStatuses[status] === maxStatus,
      );
      emit.resultsPerformed({
        lookupDuration,
        url: this.url,
        mostFrequentStatus,
        totalRequests: results.length,
        totalDuration,
        totalErrors,
        averageServiceTime: totalDuration / results.length,
        p50ServiceTime: results[Number(results.length * 0.5)].duration,
        p90ServiceTime: results[Number(results.length * 0.9)].duration,
        p95ServiceTime: results[Number(results.length * 0.95)].duration,
        maxServiceTime: results[results.length - 1].duration,
      });
    };
  }
}
