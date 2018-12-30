import React from 'react';
import { ApolloProvider } from 'react-apollo';

import client from './client';

// Rendering a simple centered box
const App = () => (
  <ApolloProvider client={client}>
    <box
      top="center"
      right={0}
      width="50%"
      height="100%"
      border={{ type: 'line' }}
      style={{ border: { fg: 'blue' } }}
    >
      <form
        border={{ type: 'line' }}
        style={{ border: { fg: 'blue' } }}
        keys
        focused
      >
        <box width={6} height={3}>
          Input:
          {' '}
        </box>
        <textbox left={6} height={3} keys mouse inputOnFocus />
      </form>
    </box>
  </ApolloProvider>
);

export default App;
