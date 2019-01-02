import React, { Component } from 'react';
import { Query, withApollo } from 'react-apollo';

import DetailedMetrics from './DetailedMetrics';

import getLastMetrics from '../gql/queries/getLastMetrics.gql';
import metricsPerformed from '../gql/subscriptions/metricsPerformed.gql';

class DetailedMetricsWithGQL extends Component {
  constructor(props) {
    super(props);

    const { client, url } = props;

    client
      .subscribe({
        query: metricsPerformed,
        variables: { url },
      })
      .forEach(() => {
        client.query({
          query: getLastMetrics,
          variables: { url },
        });
      });
  }

  render() {
    const { client, url, ...props } = this.props;

    return (
      <Query query={getLastMetrics} variables={{ url }}>
        {({ data }) => {
          if (!data || !data.getLastMetrics) {
            return (
              <DetailedMetrics
                {...props}
                url={url}
                slowMetrics={null}
                fastMetrics={null}
              />
            );
          }
          return (
            <DetailedMetrics
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

export default withApollo(DetailedMetricsWithGQL);
