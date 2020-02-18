import React from 'react';
import { Modal } from 'antd';
import { useEffect } from 'react';

function DragTitle({ title }) {
  let current = [0, 0];
  let begin = [0, 0];
  let isMoving = false;

  useEffect(() => {
    const node = document.getElementsByClassName('ant-modal')[0];
    node.style.transform = '';
  });

  const onMoving = (x, y) => {
    current = [x, y];
    const node = document.getElementsByClassName('ant-modal')[0];
    node.style.transform = `translate(${x}px,${y}px)`;
  };

  const onMouseDown = e => {
    isMoving = true;
    begin = [e.pageX - current[0], e.pageY - current[1]];
    document.addEventListener('mouseup', onMouseUp, false);
    document.addEventListener('mousemove', onMouseMove, false);
  };

  const onMouseMove = e => {
    if (isMoving) {
      const node = document.getElementsByClassName('ant-modal')[0];
      const { left, right, top, bottom } = node.getBoundingClientRect();
      let moveX = e.pageX - begin[0];
      let moveY = e.pageY - begin[1];
      if (left < current[0] - moveX || window.innerWidth - right < moveX - current[0]) {
        moveX = current[0];
      }
      if (top < current[1] - moveY || window.innerHeight - bottom < moveY - current[1]) {
        moveY = current[1];
      }
      onMoving(moveX, moveY);
    }
  };

  const onMouseUp = e => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    isMoving = false;
  };

  return (
    <div style={{ cursor: 'move' }} onMouseDown={onMouseDown}>
      {title}
    </div>
  );
}

export default function({ title, children, ...props }) {
  return (
    <Modal title={<DragTitle title={title} />} {...props}>
      {children}
    </Modal>
  );
}
