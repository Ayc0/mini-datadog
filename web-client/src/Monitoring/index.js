import React, { Component } from 'react';
import { Query, withApollo } from 'react-apollo';

import Monitoring from './Monitoring';

import getLastMinMetrics from '../gql/queries/getLastMinMetrics.gql';
import minMetricsPerformed from '../gql/subscriptions/minMetricsPerformed.gql';

class MonitoringWithGQL extends Component {
  constructor(props) {
    super(props);

    const { client, url } = props;

    client
      .subscribe({
        query: minMetricsPerformed,
        variables: { url },
      })
      .forEach(() => {
        client.query({
          query: getLastMinMetrics,
          variables: { url },
        });
      });
  }

  render() {
    const { client, url, ...props } = this.props;
    return (
      <Query query={getLastMinMetrics} variables={{ url }}>
        {({ data }) => {
          if (!data || !data.getLastMetrics) {
            return (
              <Monitoring
                {...props}
                url={url}
                slowMetrics={null}
                fastMetrics={null}
              />
            );
          }
          return (
            <Monitoring
              {...props}
              url={url}
              slowMetrics={data.getLastMetrics.slow}
              fastMetrics={data.getLastMetrics.fast}
            />
          );
        }}
      </Query>
    );
  }
}

export default withApollo(MonitoringWithGQL);
