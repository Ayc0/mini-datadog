import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import Monitorings from './Monitorings';

import getMonitoringsGQL from '../gql/queries/getMonitorings.gql';

export default props => {
  const { data } = useQuery(getMonitoringsGQL);
  if (!data || !data.getMonitorings) {
    return null;
  }
  return <Monitorings {...props} monitorings={data.getMonitorings} />;
};
