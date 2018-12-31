import React from 'react';
import { ApolloConsumer } from 'react-apollo';

import AddMonitorButton from './AddMonitorButton';

import addMonitoring from '../gql/mutations/addMonitoring.gql';
import getMonitorings from '../gql/queries/getMonitorings.gql';

export default ({ onSubmit, ...props }) => (
  <ApolloConsumer>
    {client => (
      <AddMonitorButton
        {...props}
        onCancel={onSubmit}
        onValidate={async ({ url, minutes, seconds, millis }) => {
          await client.mutate({
            mutation: addMonitoring,
            variables: {
              url,
              minutes,
              seconds,
              millis,
            },
            refetchQueries: [{ query: getMonitorings }],
          });
          onSubmit();
        }}
      />
    )}
  </ApolloConsumer>
);
