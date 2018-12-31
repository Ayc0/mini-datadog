import React from 'react';
import { withApollo } from 'react-apollo';

import metricsPerformedSub from '../gql/subscriptions/metricsPerformed.gql';

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
        top={offset * 3}
        height={4}
        border={{ type: 'line' }}
        style={{ border: { fg: 'blue' } }}
        clickable
        onClick={console.log}
      >
        <text top={0}>{`${url} - ↩️ ${checkInterval}`}</text>
        {fastMetrics && (
          <text right={1} top={0}>
            {fastMetrics.status}
          </text>
        )}
        {fastMetrics && (
          <text left={2} bottom={0}>
            {`🐇 ${fastMetrics.averageServiceTime}`}
          </text>
        )}
        {slowMetrics && (
          <text right={2} bottom={0}>
            {`🐌 ${slowMetrics.averageServiceTime}`}
          </text>
        )}
      </element>
    );
  }
}

export default withApollo(Monitoring);
