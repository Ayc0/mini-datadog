import React from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';

import AddMonitorButton from './AddMonitorButton';

import addMonitoringQGL from '../gql/mutations/addMonitoring.gql';
import getMonitoringsGQL from '../gql/queries/getMonitorings.gql';

export default ({ onSubmit, ...props }) => {
  const client = useApolloClient();
  const [addMonitoring] = useMutation(addMonitoringQGL);

  return (
    <AddMonitorButton
      {...props}
      onCancel={onSubmit}
      onValidate={async ({ url, minutes, seconds, millis }) => {
        await addMonitoring({
          variables: {
            url,
            minutes,
            seconds,
            millis,
          },
          refetchQueries: [{ query: getMonitoringsGQL }],
        });
        onSubmit();
      }}
    />
  );
};
