import React, { Component } from 'react';
import { BlockPicker } from 'react-color';

export default class ColorPicker extends Component {
  state = {
    showColorPicker: false,
  };

  onColorChange = color => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(color.hex);
    }
  };

  onColorChangeComplete = color => {
    const { onChangeComplete } = this.props;
    if (typeof onChangeComplete === 'function') {
      this.setState({ showColorPicker: false });
      onChangeComplete(color.hex);
    }
  };

  render() {
    const { color } = this.props;
    const { showColorPicker } = this.state;
    return (
      <div className="c-color-picker__wrapper">
        <div
          role="presentation"
          className="c-color-picker__btn"
          style={{ backgroundColor: color }}
          onClick={() => this.setState({ showColorPicker: !showColorPicker })}
        />
        {/* <span>{color}</span> */}
        {showColorPicker ? (
          <div className="c-color-picker__picker">
            <BlockPicker
              color={color}
              onChange={this.onColorChange}
              onChangeComplete={this.onColorChangeComplete}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
