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
      .forEach(({ data }) => {
        if (data && data.metricsPerformed) {
          // Update cache and dispatch change to modify every components that use the getAlerts query
          const query = { query: getLastMinMetrics, variables: { url } };
          const cachedQuery = client.readQuery(query);
          cachedQuery.getLastMetrics[
            data.metricsPerformed.fast ? 'fast' : 'slow'
          ] = data.metricsPerformed;
          client.writeQuery({
            ...query,
            data: cachedQuery,
          });
        }
      });
  }

  render() {
    const { client, url, ...props } = this.props;
    return (
      <Query query={getLastMinMetrics} variables={{ url }}>
        {({ data }) => {
          if (!data || !data.getLastMetrics) {
            return null;
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
