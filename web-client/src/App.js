import React, { Component } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import client from './client';

import AddMonitorButton from './AddMonitorButton';
import Monitorings from './Monitorings';
import Alerts from './Alerts';
import Button from './Button';
import DetailedMetrics from './DetailedMetrics';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { showPrompt: false, selectedMonitoringUrl: null };
  }

  render() {
    const { selectedMonitoringUrl } = this.state;
    return (
      <ApolloProvider client={client}>
        <div>
          <Button onClick={() => this.setState({ showPrompt: true })}>
            Monitor a new site
          </Button>
          <Monitorings
            onClick={url => this.setState({ selectedMonitoringUrl: url })}
          />
        </div>
        <div>
          {selectedMonitoringUrl && (
            <DetailedMetrics url={selectedMonitoringUrl} />
          )}
        </div>
        <div>
          <Alerts />
        </div>
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
