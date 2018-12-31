import React, { memo } from 'react';

import Monitoring from '../Monitoring';

const Monitorings = ({ monitorings }) => (
  <React.Fragment>
    {monitorings.map(({ url, checkInterval }, index) => (
      <Monitoring key={url} offset={index} {...{ url, checkInterval }} />
    ))}
  </React.Fragment>
);

export default memo(Monitorings);
