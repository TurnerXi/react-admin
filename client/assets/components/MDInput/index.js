import React, { Component } from 'react';
import './index.scss';
import { Icon } from 'antd';

export default class extends Component {
  constructor() {
    super();
    this.state = {
      focus: false,
      currentValue: '',
    };
  }
  fillPlaceholder = '';

  componentWillReceiveProps({ value }) {
    this.setState({ currentValue: value });
  }

  onFocusEvent = e => {
    const { onFocus, placeholder } = this.props;
    if (typeof onFocus === 'function') {
      onFocus(e);
    }
    if (placeholder) {
      this.fillPlaceholder = placeholder;
    }
    this.setState({ focus: true });
  };

  onBlurEvent = e => {
    const { onBlur } = this.props;
    this.setState({ focus: false });
    if (typeof onBlur === 'function') {
      onBlur(e);
    }
  };

  onInputEvent = e => {
    const { onInput, onChange } = this.props;
    const value = e.target.value;
    this.setState({ currentValue: value });
    if (typeof onInput === 'function') {
      onInput(value);
    }
    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  render() {
    const { focus, currentValue } = this.state;
    const { ref, label, type = 'text', icon } = this.props;
    const className = [
      'material-input__component',
      focus && 'material--active',
      (focus || currentValue) && 'material--raised',
    ]
      .filter(c => c)
      .join(' ');
    return (
      <div className={className}>
        <div className={icon && 'iconClass'}>
          {icon && <Icon className="material-input__icon" type={icon} />}
          <input
            ref={ref}
            className="material-input"
            value={currentValue}
            type={type}
            placeholder={this.fillPlaceholder}
            onFocus={this.onFocusEvent}
            onBlur={this.onBlurEvent}
            onInput={this.onInputEvent}
            onChange={this.onInputEvent}
          />
          <span className="material-input-bar" />
          <label className="material-label">{label}</label>
        </div>
      </div>
    );
  }
}
