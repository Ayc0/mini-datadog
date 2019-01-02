import React, { Component } from 'react';
import { Query, withApollo } from 'react-apollo';

import Alert from './Alert';

import getAlerts from '../gql/queries/getAlerts.gql';
import alertGenerated from '../gql/subscriptions/alertGenerated.gql';

class AlertsWithGQL extends Component {
  constructor(props) {
    super(props);

    props.client
      .subscribe({
        query: alertGenerated,
      })
      .forEach(() => {
        props.client.query({ query: getAlerts });
      });
  }

  render() {
    return (
      <Query query={getAlerts}>
        {({ data }) => {
          if (!data || !data.getAlerts) {
            return null;
          }
          return [...data.getAlerts]
            .reverse()
            .map((alert, index) => (
              <Alert offset={index} key={alert.at} alert={alert} />
            ));
        }}
      </Query>
    );
  }
}

export default withApollo(AlertsWithGQL);
