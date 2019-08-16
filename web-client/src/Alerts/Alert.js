import React, { Fragment } from 'react';
import kleur from 'kleur';

import { cut } from '../utils/math';

const Alert = ({ alert: { resolved, url, availability, at }, offset }) => {
  const color = resolved ? 'green' : 'red';
  const text = `${resolved ? '👌 ' : '🆘 '} ${url} ${kleur[color](
    `${cut(availability * 100, 1)}%`,
  )}`;
  return (
    <Fragment>
      <span>{text}</span>
      <span>At {new Date(at).toLocaleString()}</span>
    </Fragment>
  );
};

export default Alert;
