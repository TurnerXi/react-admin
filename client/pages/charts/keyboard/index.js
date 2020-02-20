import React from 'react';
import G2 from '@antv/g2';

G2.track(false);

// 自定义 shape, 支持图片形式的气泡
G2.Shape.registerShape('interval', 'borderRadius', {
  draw(cfg, container) {
    const points = cfg.points;
    let path = [];
    path.push(['M', points[0].x, points[0].y]);
    path.push(['L', points[1].x, points[1].y]);
    path.push(['L', points[2].x, points[2].y]);
    path.push(['L', points[3].x, points[3].y]);
    path.push('Z');
    path = this.parsePath(path); // 将 0 - 1 转化为画布坐标

    const width = path[2][1] - path[1][1];
    const height = path[0][2] - path[1][2];
    return container.addShape('rect', {
      attrs: {
        x: height < 0 ? path[0][1] : path[1][1], // 矩形起始点为左上角
        y: height < 0 ? path[0][2] : path[1][2],
        width,
        height: Math.abs(height), // 修复高度为负值时的圆角问题
        fill: cfg.color,
        opacity: cfg.opacity,
        radius: (path[2][1] - path[1][1]) / 2,
      },
    });
  },
});

const Animate = G2.Animate;
Animate.registerAnimation('appear', 'delayScaleInY', function(shape, animateCfg) {
  const box = shape.getBBox(); // 获取柱子包围盒
  const origin = shape.get('origin'); // 获取柱子原始数据
  const points = origin.points; // 获取柱子顶点
  // 计算柱子的变换中点
  const centerX = (box.minX + box.maxX) / 2;
  let centerY;
  if (points[0].y - points[1].y <= 0) {
    // 当顶点在零点之下
    centerY = box.maxY;
  } else {
    centerY = box.minY;
  }
  // 设置初始态
  shape.attr('transform', [
    ['t', -centerX, -centerY],
    ['s', 1, 0.1],
    ['t', centerX, centerY],
  ]);
  const index = shape.get('index');
  let delay = animateCfg.delay;
  if (G2.Util.isFunction(delay)) {
    delay = animateCfg.delay(index);
  }
  let easing = animateCfg.easing;
  if (G2.Util.isFunction(easing)) {
    easing = animateCfg.easing(index);
  }
  // 设置动画目标态
  shape.animate(
    {
      transform: [
        ['t', -centerX, -centerY],
        ['s', 1, 10],
        ['t', centerX, centerY],
      ],
    },
    animateCfg.duration,
    easing,
    animateCfg.callback,
    delay
  );
});

export default class Charts extends React.Component {
  componentDidMount() {
    // const data = [
    //   { genre: 'Sports', sold: 275 },
    //   { genre: 'Strategy', sold: 115 },
    //   { genre: 'Action', sold: 120 },
    //   { genre: 'Shooter', sold: 350 },
    //   { genre: 'Other', sold: 150 },
    // ];
    const data = [];
    for (let i = 0; i < 50; i++) {
      let y1 = (Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5;
      let y2 = (Math.sin(i / 5) * (i / 5 + 10) + i / 6) * 3;
      let x = i;
      data.push({ x, y1, y2 });
    }
    const chart = new G2.Chart({
      container: 'c1',
      forceFit: true,
      height: 700,
    });
    chart.tooltip({
      crosshairs: false,
    });
    // load the data
    chart.source(data, {
      y1: {
        max: 80,
      },
      y2: {
        max: 80,
      },
    });

    // chart.on('interval:mouseenter', ev => {
    //   console.log(ev);
    //   const element = ev.element;
    //   element.setState('active', true);
    // });
    // chart.on('interval:mouseleave', ev => {
    //   // const element = ev.element;
    //   // element.setState('active', false);
    // });
    // draw a column chart
    chart
      .axis('y2', false)
      .axis('x', false)
      .axis('y1', {
        line: null,
        grid: null,
      });
    chart
      .interval()
      .opacity(0.4)
      .shape('borderRadius')
      .position('x*y2')
      .style({
        shadowBlur: 3,
        shadowColor: '#111',
      })
      .color('x', ['#4a657a', '#308e92', '#b1cfa5', '#f5d69f', '#f5898b', '#ef5055'])
      .tooltip('x*y2', (x, y2) => ({ title: 'x=' + x, name: 'y2', value: y2 }));
    chart
      .area()
      .position('x*y1')
      .style({
        fill: '#08263a',
        shadowColor: '#000',
        shadowBlur: 50,
      });
    chart
      .interval()
      .shape('borderRadius')
      .position('x*y1')
      .animate({
        appear: {
          animation: 'delayScaleInY',
          easing: 'easeElasticOut',
          delay: index => {
            return index * 10;
          },
        },
      })
      .color('x', ['#4a657a', '#308e92', '#b1cfa5', '#f5d69f', '#f5898b', '#ef5055'])
      .tooltip('x*y1', (x, y1) => ({ title: 'x=' + x, name: 'y1', value: y1 }));

    chart.render();
  }
  render() {
    return (
      <div>
        <div id="c1" style={{ width: '100%', height: 800, backgroundColor: '#08263a' }}></div>
      </div>
    );
  }
}
