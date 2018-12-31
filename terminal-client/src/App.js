import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';

import client from './client';

import AddMonitorButton from './AddMonitorButton';
import Monitorings from './Monitorings';
import Button from './Button';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { showPrompt: false };
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <box top="center" left={0} width="30%" height="100%">
          <Button
            onClick={() => this.setState({ showPrompt: true })}
            left="center"
            width={30}
            top={1}
            height={3}
            padding={5}
          >
            Monitor a new site
          </Button>
          <Monitorings />
        </box>
        <box
          top="center"
          left="30%"
          width="50%"
          height="100%"
          border={{ type: 'line' }}
          style={{ border: { fg: 'blue' } }}
        >
          <element>center</element>
        </box>
        <box
          top="center"
          left="80%"
          width="20%"
          height="100%"
          border={{ type: 'line' }}
          style={{ border: { fg: 'blue' } }}
        >
          <box>Second box.</box>
        </box>
        {this.state.showPrompt && (
          <AddMonitorButton
            onSubmit={() => this.setState({ showPrompt: false })}
          />
        )}
      </ApolloProvider>
    );
  }
}
export default App;
