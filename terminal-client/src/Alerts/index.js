import React, { Component } from 'react';
import { withApollo } from 'react-apollo';

import Alert from './Alert';

import getAlerts from '../gql/queries/getAlerts.gql';
import alertGenerated from '../gql/subscriptions/alertGenerated.gql';

class AlertsWithGQL extends Component {
  constructor(props) {
    super(props);

    this.state = { alerts: [] };

    props.client
      .query({
        query: getAlerts,
      })
      .then(({ data }) => {
        if (data && data.getAlerts) {
          this.setState({
            alerts: data.getAlerts,
          });
        }
      });

    props.client
      .subscribe({
        query: alertGenerated,
      })
      .forEach(({ data }) => {
        if (data && data.alertGenerated) {
          this.setState(({ alerts }) => ({
            alerts: [...alerts, data.alertGenerated],
          }));
        }
      });
  }

  render() {
    console.log(this.state.alerts);
    return this.state.alerts.map((alert, index) => (
      <Alert offset={index} key={alert.at} alert={alert} />
    ));
  }
}

export default withApollo(AlertsWithGQL);
