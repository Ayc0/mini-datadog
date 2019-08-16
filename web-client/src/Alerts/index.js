import React from 'react';
import { Query, withApollo } from 'react-apollo';
import { useQuery, useSubscription } from '@apollo/react-hooks';

import Alert from './Alert';

import getAlerts from '../gql/queries/getAlerts.gql';
import alertGenerated from '../gql/subscriptions/alertGenerated.gql';

const Alerts = React.memo(() => {
  const { data } = useQuery(getAlerts); //, { fetchPolicy: 'network-only' });

  if (!data || !data.getAlerts) {
    return null;
  }
  return [...data.getAlerts]
    .reverse()
    .map((alert, index) => (
      <Alert offset={index} key={alert.at} alert={alert} />
    ));
});

export default Alerts;
