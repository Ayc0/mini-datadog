import React, { Component } from 'react';

import Button from '../Button';

class AddMonitorButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      minutes: 0,
      seconds: 0,
      millis: 0,
    };

    this.onInput = state => {
      const onChange = event => {
        let value = event.target.value;
        if (state !== 'url') {
          value = parseInt(value, 10);
          if (Number.isNaN(value)) {
            return;
          }
        }
        this.setState({ [state]: value });
      };
      return { onChange, value: this.state[state] };
    };
  }

  onValidate() {
    const { url, minutes, seconds, millis } = this.state;
    if (minutes + seconds + millis !== 0 && url) {
      this.props.onValidate({ url, minutes, seconds, millis });
    }
  }

  render() {
    const { onCancel } = this.props;
    return (
      <div>
        <div>
          <label>URL:</label>
          <input {...this.onInput('url')} />
        </div>
        <span>
          Interval between two requests
        </span>
        <div>
          <label>minutes:</label>
          <input type="number" {...this.onInput('minutes')} />
        </div>
        <div>
          <label>seconds:</label>
          <input type="number" {...this.onInput('seconds')} />
        </div>
        <div>
          <label>millis:</label>
          <input type="number" {...this.onInput('millis')} />
        </div>
        <Button
          width={8}
          height={3}
          bottom={0}
          right={8}
          padding={1}
          onClick={() => this.onValidate()}
        >
          Send
        </Button>
        <Button
          width={10}
          height={3}
          bottom={0}
          right={16}
          padding={1}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    );
  }
}
export default AddMonitorButton;
