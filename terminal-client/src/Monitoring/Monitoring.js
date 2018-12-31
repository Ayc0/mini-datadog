import React from 'react';
import { withApollo } from 'react-apollo';
import kleur from 'kleur';

import subscription from '../gql/subscriptions/minMetricsPerformed.gql';
import formatTime from '../utils/formatTime';
import { statusColor } from '../utils/color';

class Monitoring extends React.Component {
  constructor(props) {
    super(props);

    this.state = { fastMetrics: null, slowMetrics: null };

    props.client
      .subscribe({
        query: subscription,
        variables: { url: props.url },
      })
      .forEach(({ data: { metricsPerformed } }) => {
        if (metricsPerformed.fast) {
          this.setState({ fastMetrics: metricsPerformed });
        } else {
          this.setState({ slowMetrics: metricsPerformed });
        }
      });
  }

  render() {
    const { offset = 0, url, checkInterval } = this.props;
    const { fastMetrics, slowMetrics } = this.state;
    return (
      <element
        width="100%"
        left="center"
        top={offset * 3 + 4}
        height={4}
        border={{ type: 'line' }}
        style={{ border: { fg: 'blue' } }}
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
          {fastMetrics
            ? `🐇 ${formatTime(fastMetrics.averageServiceTime)}`
            : '🕑'}
        </text>

        <text left={14} bottom={0}>
          {slowMetrics
            ? `🐌 ${formatTime(slowMetrics.averageServiceTime)}`
            : '🕑'}
        </text>
      </element>
    );
  }
}

export default withApollo(Monitoring);
