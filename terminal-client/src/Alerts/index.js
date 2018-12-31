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
      .forEach(({ data }) => {
        if (data && data.alertGenerated) {
          // Update cache and dispatch change to modify every components that use the getAlerts query
          const query = props.client.readQuery({ query: getAlerts });
          query.getAlerts.push(data.alertGenerated);
          props.client.writeQuery({ query: getAlerts, data: query });
        }
      });
  }

  render() {
    return (
      <Query query={getAlerts}>
        {({ data }) => {
          if (!data || !data.getAlerts) {
            return null;
          }
          return data.getAlerts.map((alert, index) => (
            <Alert offset={index} key={alert.at} alert={alert} />
          ));
        }}
      </Query>
    );
  }
}

export default withApollo(AlertsWithGQL);
