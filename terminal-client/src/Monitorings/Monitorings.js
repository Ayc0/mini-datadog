import React from 'react';

import Monitoring from '../Monitoring';

const Monitorings = ({ monitorings }) =>
  monitorings.map(({ url, checkInterval }, index) => (
    <Monitoring key={url} offset={index} {...{ url, checkInterval }} />
  ));

export default Monitorings;
