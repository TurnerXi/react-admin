import React, { Component } from 'react';
import { Card, List } from 'antd';

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

function Board({ title, color, data, onStart, onHover, onEnd }) {
  let beforeY = 0;
  let dragger = null;
  const initColor = color => {
    dragger.style.boxShadow = '';
    dragger.style.transition = '';
    dragger.style.color = '#fff';
    dragger.style.backgroundColor = color;
  };

  const resetColor = () => {
    dragger.style.color = '';
    dragger.style.backgroundColor = '';
  };

  const onDragStart = (e, idx) => {
    e.dataTransfer.effectAllowed = 'all';
    dragger = e.currentTarget;
    initColor(color);
    onStart(dragger, idx);
    setTimeout(() => {
      resetColor();
    }, 100);
  };

  const onDragOver = (e, type) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (data.length === 0) {
      onHover(0);
    } else {
      if (e.target.getAttribute('data-target') === 'drop-target') {
        if (e.pageY >= beforeY) {
          onHover(e.target.getAttribute('data-idx'));
        } else {
          onHover(e.target.getAttribute('data-idx') - 1);
        }
      }
    }
    beforeY = e.pageY;
  };

  const onMouseEnter = e => {
    e.currentTarget.style.transition = 'all .3s ease-in-out';
    e.currentTarget.style.boxShadow = `${color} 2px 2px 10px -5px`;
  };

  const onMouseLeave = e => {
    e.currentTarget.style.transition = '';
    e.currentTarget.style.boxShadow = '';
  };

  return (
    <Card title={title} headStyle={{ backgroundColor: color, color: '#fff' }} style={styles.cards} onDragOver={onDragOver}>
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
            onDragStart={e => onDragStart(e, idx)}
            onDragEnd={onEnd}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            {item}
          </List.Item>
        )}
      />
    </Card>
  );
}

export default class DragKanban extends Component {
  state = {
    data: [],
  };

  onStart = (dragger, idx, boardIdx) => {
    const data = this.state.data[boardIdx];
    this.current = data[idx];
    this.dragger = dragger;
    this.boardIdx = boardIdx;
  };

  onHover = (idx, boardIdx) => {
    const preState = this.state.data;
    const preBoard = this.boardIdx;
    preState[preBoard].splice(preState[preBoard].indexOf(this.current), 1);
    preState[boardIdx].splice(idx, 0, this.current);
    this.setState({ data: preState });
    this.boardIdx = boardIdx;
  };

  onEnd = () => {
    const { onChange } = this.props;
    onChange(this.state.data);
  };

  componentDidMount() {
    const { configs, datas } = this.props;
    while (configs.length > datas.length) {
      datas.push([]);
    }
    this.setState({ data: [...datas] });
  }

  render() {
    const { configs } = this.props;
    const { data } = this.state;

    return (
      <div style={styles.container}>
        {configs.map((config, boardIdx) => (
          <Board
            title={config.title}
            color={config.color}
            onStart={(dragger, itemIdx) => this.onStart(dragger, itemIdx, boardIdx)}
            onHover={data => this.onHover(data, boardIdx)}
            onEnd={this.onEnd}
            data={data[boardIdx] || []}
          />
        ))}
      </div>
    );
  }
}
