import React from 'react';
import { Query } from 'react-apollo';

import Monitorings from './Monitorings';

import getMonitorings from '../gql/queries/getMonitorings.gql';

export default props => (
  <Query query={getMonitorings}>
    {({ data }) => {
      if (!data || !data.getMonitorings) {
        return null;
      }
      return <Monitorings {...props} monitorings={data.getMonitorings} />;
    }}
  </Query>
);
