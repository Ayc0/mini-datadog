import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';

import client from './client';

import Monitorings from './Monitorings';

class App extends Component {
  componentWillUnmount() {
    console.log('bye bye');
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <box top="center" left={0} width="30%" height="100%">
          {/* <form keys>
        <box>Input:</box>
        <textbox
          left={7}
          keys
          mouse
          inputOnFocus
          focused
          onSubmit={console.log}
        />
      </form> */}
          {/* <element scrollable>
            <line width="100%" height={1} orientation="horizontal" /> 
            <text border={{ type: 'line' }}>First box.</text>
            <text border={{ type: 'line' }}>Second box.</text>
          </element> */}
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
          <element>
            <list
              mouse
              keys
              // label="List"
              // border={{ type: 'line' }}
              // width="50%"
              // height="50%"
              // left="25%"
              // top="25%"
              style={{
                // border: { fg: 'blue' },
                item: { fg: 'white' },
                selected: { fg: 'yellow' },
              }}
              items={['1', '2', '3', '4', '5', '6']}
              onSelect={() => console.error('selected')}
            />
          </element>
        </box>
        <box
          top="center"
          left="80%"
          width="20%"
          height="100%"
          border={{ type: 'line' }}
          style={{ border: { fg: 'blue' } }}
        >
          <element>
            <box>First box.</box>
            <box>Second box.</box>
          </element>
        </box>
      </ApolloProvider>
    );
  }
}
export default App;
