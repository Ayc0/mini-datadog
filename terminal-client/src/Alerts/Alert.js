import React, { Fragment } from 'react';
import kleur from 'kleur';

import { cut } from '../utils/math';

const Alert = ({ alert: { resolved, url, availability, at }, offset }) => {
  const color = resolved ? 'green' : 'red';
  const text = `${resolved ? '👌 ' : '🆘 '} ${url} ${kleur[color](
    `${(cut(availability * 100), 1)}%`,
  )}`;
  return (
    <Fragment>
      <text top={offset * 3}>{text}</text>
      <text top={offset * 3 + 1} right={0}>
        At {new Date(at).toLocaleString()}
      </text>
    </Fragment>
  );
};

export default Alert;
