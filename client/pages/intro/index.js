import React from 'react';
import { Alert, Button } from 'antd';
import introJs from 'intro.js';
import 'intro.js/introjs.css';
import 'intro.js/themes/introjs-modern.css';

export default class Intro extends React.PureComponent {
  startIntro() {
    introJs().start();
  }

  render() {
    return (
      <div>
        <Alert message={<Message />} type="info" showIcon />
        <Button
          style={{ marginTop: '10px' }}
          icon="question-circle"
          onClick={this.startIntro.bind(this)}
        >
          打开引导
        </Button>
      </div>
    );
  }
}

function Message() {
  return (
    <span>
      引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于
      <a
        href="https://github.com/kamranahmedse/driver.js"
        rel="noopener noreferrer"
        target="_blank"
      >
        driver.js
      </a>
      .
    </span>
  );
}
