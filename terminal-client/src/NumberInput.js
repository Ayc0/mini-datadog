import React, { Component, createRef } from 'react';

function setValue(value) {
  // eslint-disable-next-line
  let visible, val;
  if (value == null) {
    value = this.value;
  }
  if (this._value !== value) {
    value = value.replace(/\n/g, '');
    value = Array.from(value)
      .filter(char => !Number.isNaN(Number(char)))
      .join('');
    this.value = value;
    this._value = value;
    if (this.secret) {
      this.setContent('');
    } else if (this.censor) {
      this.setContent(Array(this.value.length + 1).join('*'));
    } else {
      visible = -(this.width - this.iwidth - 1);
      val = this.value.replace(/\t/g, this.screen.tabc);
      this.setContent(val.slice(visible));
    }
    this._updateCursor();
  }
}

class NumberInput extends Component {
  constructor(props) {
    super(props);

    this.text = createRef();
  }

  componentDidMount() {
    this.text.current.setValue = setValue;
  }

  render() {
    return <textbox ref={this.text} {...this.props} />;
  }
}
export default NumberInput;
