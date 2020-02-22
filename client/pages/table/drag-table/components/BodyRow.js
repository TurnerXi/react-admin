import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import './BodyRow.css';

const TYPE = 'row';
let draggingIndex = -1;

const dragSpec = {
  beginDrag(props) {
    draggingIndex = props.index;
    return {
      index: props.index,
    };
  },
};

const dropSpec = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    props.moveRow(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  },
};

function BodyRow({ isOver, connectDragSource, connectDropTarget, moveRow, ...restProps }) {
  const style = { ...restProps.style, cursor: 'move' };
  let className = restProps.className;
  if (isOver) {
    if (restProps.index > draggingIndex) {
      className += ' drop-over-downward';
    } else {
      className += ' drop-over-upward';
    }
  }
  return connectDragSource(connectDropTarget(<tr {...restProps} style={style} className={className} />));
}

export default DragSource(TYPE, dragSpec, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
}))(
  DropTarget(TYPE, dropSpec, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }))(BodyRow)
);
