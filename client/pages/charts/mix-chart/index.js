import React, { useEffect } from 'react';
import G2 from '@antv/g2';
import DataSet from '@antv/data-set';

G2.track(false);

const female = [709, 1917, 2455, 2610, 1719, 1433, 1544, 3285, 5208, 3372, 2484, 4078];
const male = [327, 1776, 507, 1200, 800, 482, 204, 1390, 1001, 951, 381, 220];
const data = Array(12)
  .fill()
  .map((item, idx) => ({
    month: `Month ${idx + 1}`,
    female: female[idx],
    male: male[idx],
    average: (female[idx] + male[idx]) / 2,
  }));

const max = Math.max(...female, ...male) * 2;
const min = 0;

const Shape = G2.Shape;
Shape.registerShape('interval', 'textInterval', {
  draw(cfg, group) {
    const points = this.parsePoints(cfg.points); // 将0-1空间的坐标转换为画布坐标
    const value = cfg.origin._origin.value;
    group.addShape('text', {
      attrs: {
        text: value,
        textAlign: 'center',
        x: points[1].x + cfg.size / 2,
        y: points[1].y,
        fontFamily: 'PingFang SC',
        fontSize: 12,
        fill: '#BBB',
      },
    });
    const polygon = group.addShape('polygon', {
      attrs: {
        points: points.map(point => [point.x, point.y]),
        fill: cfg.color,
      },
    });
    return polygon;
  },
});

export default function() {
  useEffect(() => {
    const chart = new G2.Chart({
      container: 'c',
      forceFit: true,
      height: 700,
      background: {
        fill: '#344b58',
      },
    });

    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'rename',
      map: {
        male: '男性',
        female: '女性',
      },
    }).transform({
      type: 'fold',
      fields: ['男性', '女性'],
      key: 'type',
      value: 'value',
      retains: ['month', 'average'],
    });

    chart.source(dv, {
      average: { min: min * 2, alias: '平均' },
      value: { max, min },
    });
    chart.legend('average', {
      marker: 'hollowCircle',
    });
    chart.axis('average', false);
    chart.axis('value', {
      grid: false,
      line: {
        stroke: '#90979c',
      },
      label: {
        textStyle: {
          fill: '#90979c',
        },
      },
    });
    chart.axis('month', {
      line: {
        stroke: '#90979c',
      },
      label: {
        textStyle: {
          fill: '#90979c',
        },
      },
    });

    chart.tooltip({
      crosshairs: {
        type: 'y',
        style: {
          stroke: '#fff',
        },
      },
    });
    chart
      .intervalStack()
      .position('month*value')
      .color('type', ['rgba(0,191,183,1)', 'rgba(255,144,128,1)'])
      .label('value', {
        offset: 0, // 文本距离图形的距离
        textStyle(value, param) {
          if (param.point.type === '男性') {
            return { fill: 'rgba(0,191,183,1)', textBaseline: 'bottom' };
          } else {
            return { fill: '#fff', textBaseline: 'top' };
          }
        },
      });
    chart
      .point()
      .shape('circle')
      .position('month*average')
      .color('rgba(252,230,48,1)')
      .size(4);
    chart
      .line()
      .position('month*average')
      .color('rgba(252,230,48,1)')
      .label('average', {
        textStyle: { fill: 'rgba(252,230,48,1)' },
      });
    chart.render();
    return () => {};
  }, []);
  return <div id="c"></div>;
}
