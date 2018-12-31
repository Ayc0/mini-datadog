import React from 'react';

const Button = ({ padding = 0, ...props }) => (
  <button
    clickable
    border={{ type: 'line' }}
    style={{ border: { fg: 'blue' } }}
    padding={{ top: 0, bottom: 0, left: padding, right: padding }}
    {...props}
  />
  );

export default Button;
