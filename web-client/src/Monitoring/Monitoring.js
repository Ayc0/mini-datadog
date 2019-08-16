import React from 'react';
import kleur from 'kleur';

import formatTime from '../utils/formatTime';
import { statusColor } from '../utils/color';

const Monitoring = ({
  offset = 0,
  url,
  checkInterval,
  fastMetrics,
  slowMetrics,
  onClick,
}) => (
  <div role="button" onClick={() => onClick(url)} tabIndex={0}>
    <span>{`${url}  ${formatTime(checkInterval)} ↩️`}</span>
    {fastMetrics && (
      <span>
        {kleur[statusColor(fastMetrics.lastStatus)](
          fastMetrics.lastStatus === 0 ? 'Error' : fastMetrics.lastStatus,
        )}
      </span>
    )}

    <span>
      {fastMetrics ? `🐇 ${formatTime(fastMetrics.averageServiceTime)}` : '🕑'}
    </span>

    <span>
      {slowMetrics ? `🐌 ${formatTime(slowMetrics.averageServiceTime)}` : '🕑'}
    </span>
  </div>
);

export default Monitoring;
