import React from 'react';
import blessed from 'blessed';
import { render } from 'react-blessed';

import App from './App';

// Creating our screen
const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'react-blessed hello world',
});

// Adding a way to quit the program
screen.key(['escape', 'C-c'], () => process.exit(0));

// Enable key and mouse events
screen.enableInput();

// Rendering the React app using our screen
render(<App />, screen);

export default screen;
