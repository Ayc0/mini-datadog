import React from 'react';

import Monitoring from '../Monitoring';

const Monitorings = ({ monitorings, onClick }) =>
  monitorings.map(({ url, checkInterval }, index) => (
    <Monitoring key={url} offset={index} {...{ url, checkInterval, onClick }} />
  ));

export default Monitorings;
