import React from 'react';
import { Query, withApollo } from 'react-apollo';
import {
  useApolloClient,
  useQuery,
  useSubscription,
} from '@apollo/react-hooks';

import Alert from './Alert';

import getAlerts from '../gql/queries/getAlerts.gql';
import alertGenerated from '../gql/subscriptions/alertGenerated.gql';

const Alerts = React.memo(() => {
  const { data: newAlert } = useSubscription(alertGenerated);
  const client = useApolloClient();

  React.useEffect(() => {
    if (!newAlert) {
      return;
    }
    const data = client.readQuery({ query: getAlerts });
    client.writeQuery({
      query: getAlerts,
      data: {
        ...data,
        getAlerts:
          data && data.getAlerts
            ? [...data.getAlerts, newAlert.alertGenerated]
            : [newAlert.alertGenerated],
      },
    });
  }, [newAlert]);

  const { data } = useQuery(getAlerts);

  if (!data || !data.getAlerts) {
    return null;
  }
  return (
    <>
      {data.getAlerts.length ? <hr /> : null}
      {[...data.getAlerts].reverse().map((alert, index) => (
        <Alert offset={index} key={alert.at} alert={alert} />
      ))}
    </>
  );
});

export default Alerts;
