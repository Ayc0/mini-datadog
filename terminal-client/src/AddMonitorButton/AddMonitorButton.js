import React, { Component } from 'react';

import Button from '../Button';
import NumberInput from '../NumberInput';

class AddMonitorButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      minutes: 0,
      seconds: 0,
      millis: 0,
      focused: false,
    };

    this.onInput = state => value => {
      if (state !== 'url') {
        value = parseInt(value, 10);
        if (Number.isNaN(value)) {
          return;
        }
      }

      this.setState({ [state]: value });
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
      <box
        label="Monitor new site"
        top="center"
        left="center"
        width={50}
        height={20}
        border={{ type: 'line' }}
        style={{ border: { fg: 'blue' } }}
      >
        <form top={4}>
          <box>URL:</box>
          <textbox
            left={5}
            mouse
            inputOnFocus
            clickable={!this.state.focused}
            onFocus={() => this.setState({ focused: true })}
            onBlur={() => this.setState({ focused: false })}
            onSubmit={this.onInput('url')}
          />
        </form>
        <form top={6}>
          <box>minutes:</box>
          <NumberInput
            left={8}
            mouse
            inputOnFocus
            clickable={!this.state.focused}
            onFocus={() => this.setState({ focused: true })}
            onBlur={() => this.setState({ focused: false })}
            onSubmit={this.onInput('minutes')}
          />
        </form>
        <form top={7}>
          <box>seconds:</box>
          <NumberInput
            left={8}
            mouse
            inputOnFocus
            clickable={!this.state.focused}
            onFocus={() => this.setState({ focused: true })}
            onBlur={() => this.setState({ focused: false })}
            onSubmit={this.onInput('seconds')}
          />
        </form>
        <form top={8}>
          <box>millis:</box>
          <NumberInput
            left={7}
            mouse
            inputOnFocus
            clickable={!this.state.focused}
            onFocus={() => this.setState({ focused: true })}
            onBlur={() => this.setState({ focused: false })}
            onSubmit={this.onInput('millis')}
          />
        </form>
        <Button
          width={8}
          height={3}
          bottom={0}
          right={4}
          padding={1}
          onClick={() => this.onValidate()}
        >
          Send
        </Button>
        <Button
          width={10}
          height={3}
          bottom={0}
          right={12}
          padding={1}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </box>
    );
  }
}
export default AddMonitorButton;
