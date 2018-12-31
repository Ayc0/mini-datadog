import React from 'react';
import { Query } from 'react-apollo';

import Monitorings from './Monitorings';

import getMonitorings from '../gql/queries/getMonitorings.gql';
// import addMonitoring from '../gql/mutations/addMonitoring.gql';

export default props => (
  <Query query={getMonitorings}>
    {({ data, loading, error }) => {
      if (loading || error || !data || !data.getMonitorings) {
        return null;
      }
      return <Monitorings {...props} monitorings={data.getMonitorings} />;
    }}
  </Query>
);
