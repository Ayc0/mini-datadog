import React from 'react';
import { withApollo } from 'react-apollo';

// eslint-disable-next-line
import kleur from 'kleur';

import metricsPerformedSub from '../gql/subscriptions/metricsPerformed.gql';
import formatTime from '../utils/formatTime';
import { statusColor } from '../utils/color';

class Monitoring extends React.Component {
  constructor(props) {
    super(props);

    this.state = { fastMetrics: null, slowMetrics: null };

    this.subscription = props.client
      .subscribe({
        query: metricsPerformedSub,
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
        clickable
        onClick={console.log}
      >
        <text top={0}>{`${url}    ${formatTime(checkInterval)} ↩️`}</text>
        {fastMetrics && (
          <text right={3} top={0}>
            {kleur[statusColor(fastMetrics.lastStatus)](
              fastMetrics.lastStatus === 0 ? 'Error' : fastMetrics.lastStatus,
            )}
          </text>
        )}

        <text left={2} bottom={0}>
          {fastMetrics
            ? `🐇 ${formatTime(fastMetrics.averageServiceTime)}`
            : '🕑'}
        </text>

        <text right={2} bottom={0}>
          {slowMetrics
            ? `🐌 ${formatTime(slowMetrics.averageServiceTime)}`
            : '🕑'}
        </text>
      </element>
    );
  }
}

export default withApollo(Monitoring);
