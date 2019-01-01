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
  <element
    width="100%"
    left="center"
    top={offset * 3 + 4}
    height={4}
    border={{ type: 'line' }}
    style={{ border: { fg: 'blue' } }}
    onClick={() => onClick(url)}
    clickable
  >
    <text top={0}>{`${url}  ${formatTime(checkInterval)} ↩️`}</text>
    {fastMetrics && (
      <text right={1} top={0}>
        {kleur[statusColor(fastMetrics.lastStatus)](
          fastMetrics.lastStatus === 0 ? 'Error' : fastMetrics.lastStatus,
        )}
      </text>
    )}

    <text left={4} bottom={0}>
      {fastMetrics ? `🐇 ${formatTime(fastMetrics.averageServiceTime)}` : '🕑'}
    </text>

    <text left={14} bottom={0}>
      {slowMetrics ? `🐌 ${formatTime(slowMetrics.averageServiceTime)}` : '🕑'}
    </text>
  </element>
);

export default Monitoring;
