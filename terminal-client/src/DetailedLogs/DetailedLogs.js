import React, { Fragment } from 'react';
import kleur from 'kleur';

import formatTime from '../utils/formatTime';
import { round } from '../utils/math';
import { statusColor } from '../utils/color';

const displayStatus = (isError, status) =>
  kleur[statusColor(status)](isError ? 'Error' : status);

const plural = (number, word) => `${number} ${word}${number > 1 ? 's' : ''}`;

const DetailedMetrics = ({ metrics }) => {
  if (!metrics) {
    return (
      <text left="center" top={0}>
        No metrics gathered yet.
      </text>
    );
  }
  const {
    fast,
    lookupDuration,
    lastStatus,
    lastWasError,
    mostFrequentStatus,
    totalRequests,
    totalDuration,
    totalErrors,
    averageServiceTime,
    standardDeviationServiceTime,
    p50ServiceTime,
    p90ServiceTime,
    p95ServiceTime,
    maxServiceTime,
  } = metrics;
  const title = `${fast ? '🐇 ' : '🐌 '} Metrics computed during ${formatTime(
    lookupDuration,
  )}`;
  let tolerance = round(
    (standardDeviationServiceTime / averageServiceTime) * 100,
  );
  if (tolerance < 10) {
    tolerance = kleur.green(`(±${tolerance}%)`);
  } else if (tolerance < 25) {
    tolerance = kleur.blue(`(±${tolerance}%)`);
  } else if (tolerance < 50) {
    tolerance = kleur.yellow(`(±${tolerance}%)`);
  } else {
    tolerance = kleur.red(`(±${tolerance}%)`);
  }
  const metricsToDisplay = [
    `Last status: ${displayStatus(lastWasError, lastStatus)}`,
    `Most frequent status: ${displayStatus(
      mostFrequentStatus === 0,
      mostFrequentStatus,
    )}`,
    '',
    plural(totalRequests, 'request'),
    plural(totalErrors, 'error'),
    `${formatTime(totalDuration)} of requesting`,
    '',
    `Average service time: ${formatTime(averageServiceTime)} ${tolerance}`,
    `    P50 service time: ${formatTime(p50ServiceTime)}`,
    `    P90 service time: ${formatTime(p90ServiceTime)}`,
    `    P95 service time: ${formatTime(p95ServiceTime)}`,
    `    Max service time: ${formatTime(maxServiceTime)}`,
  ];
  return (
    <Fragment>
      <text top={0} left={2} width="100%-4">
        {title}
      </text>
      {metricsToDisplay.map((text, index) => (
        <text top={3 + index} left={2}>
          {text}
        </text>
      ))}
    </Fragment>
  );
};

export default ({ url, slowMetrics, fastMetrics }) => {
  const title = `Detailed metrics for ${url}`;
  return (
    <Fragment>
      <text left="center" top={2}>
        {title}
      </text>

      <line
        orientation="vertical"
        width={1}
        left="center"
        top={5}
        height="100%-7"
      />
      <box left={0} top={5} height="100%-7" width="48%">
        <DetailedMetrics metrics={fastMetrics} />
      </box>
      <box right={0} top={5} height="100%-7" width="48%">
        <DetailedMetrics metrics={slowMetrics} />
      </box>
    </Fragment>
  );
};
