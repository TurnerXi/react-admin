import React, { Component } from 'react';
import { Card, List } from 'antd';
import I18nProvider from '@/lang';
import { blue, yellow, green } from '@ant-design/colors';

const styles = {
  container: { display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' },
  cards: { width: '300px' },
  list: { height: '100%' },
  listItem: {
    margin: '10px 5px',
    textAlign: 'center',
    border: '1px solid #999',
    userSelect: 'none',
  },
};

class Board extends Component {
  beforeY = 0;

  initColor = color => {
    this.dragger.style.boxShadow = '';
    this.dragger.style.transition = '';
    this.dragger.style.color = '#fff';
    this.dragger.style.backgroundColor = color;
  };

  resetColor = () => {
    this.dragger.style.color = '';
    this.dragger.style.backgroundColor = '';
  };

  onDragStart = (e, idx) => {
    const { color, onStart } = this.props;
    e.dataTransfer.effectAllowed = 'all';
    this.dragger = e.currentTarget;
    this.initColor(color);
    onStart(this.dragger, idx);
    setTimeout(() => {
      this.resetColor();
    }, 100);
  };

  onDragOver = (e, type) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const { data, onHover } = this.props;
    if (data.length === 0) {
      onHover(0);
    } else {
      if (e.target.getAttribute('data-target') === 'drop-target') {
        if (e.pageY >= this.beforeY) {
          onHover(e.target.getAttribute('data-idx'));
        } else {
          onHover(e.target.getAttribute('data-idx') - 1);
        }
      }
    }
    this.beforeY = e.pageY;
  };

  onMouseEnter = e => {
    const { color } = this.props;
    e.currentTarget.style.transition = 'all .3s ease-in-out';
    e.currentTarget.style.boxShadow = `${color} 2px 2px 10px -5px`;
  };

  onMouseLeave = e => {
    e.currentTarget.style.transition = '';
    e.currentTarget.style.boxShadow = '';
  };

  render() {
    const { title, color, data } = this.props;
    return (
      <Card
        title={title}
        headStyle={{ backgroundColor: color, color: '#fff' }}
        style={styles.cards}
        onDragOver={this.onDragOver}
      >
        <List
          split={false}
          dataSource={data}
          style={styles.list}
          renderItem={(item, idx) => (
            <List.Item
              data-idx={idx}
              data-target="drop-target"
              style={styles.listItem}
              draggable
              onDragStart={e => this.onDragStart(e, idx)}
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
            >
              {item}
            </List.Item>
          )}
        />
      </Card>
    );
  }
}

export default class DragKanban extends Component {
  state = {
    todo: new Array(10).fill().map((item, idx) => `Mission ${idx}`),
    working: [],
    done: [],
  };

  onStart = (dragger, idx, type) => {
    const data = this.state[type];
    this.current = data[idx];
    this.dragger = dragger;
    this.type = type;
  };

  onHover = (idx, type) => {
    const preState = { ...this.state };
    const preType = this.type;
    preState[preType].splice(preState[preType].indexOf(this.current), 1);
    preState[type].splice(idx, 0, this.current);
    this.setState(preState);
    this.type = type;
  };

  render() {
    const { title } = this.props;
    const { todo, working, done } = this.state;

    return (
      <I18nProvider scope="components">
        <Card title={title}>
          <div style={styles.container}>
            <Board
              title="Todo"
              color={blue.primary}
              onStart={(dragger, idx) => this.onStart(dragger, idx, 'todo')}
              onHover={data => this.onHover(data, 'todo')}
              data={todo}
            />
            <Board
              title="Working"
              color={yellow.primary}
              onStart={(dragger, idx) => this.onStart(dragger, idx, 'working')}
              onHover={data => this.onHover(data, 'working')}
              data={working}
            />
            <Board
              title="Done"
              color={green.primary}
              onStart={(dragger, idx) => this.onStart(dragger, idx, 'done')}
              onHover={data => this.onHover(data, 'done')}
              data={done}
            />
          </div>
        </Card>
      </I18nProvider>
    );
  }
}
