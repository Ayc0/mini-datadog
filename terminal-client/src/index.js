import React from 'react';
import blessed from 'blessed';
import { render } from 'react-blessed';

import App from './App';

// Creating our screen
const screen = blessed.screen({
  fullUnicode: true,
  autoPadding: true,
  smartCSR: true,
  title: 'react-blessed hello world',
});

// Adding a way to quit the program
screen.key(['C-c'], () => process.exit(0));

// Enable key and mouse events
screen.enableInput();

render(<App />, screen);
