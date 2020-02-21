import React, { useEffect } from 'react';
import G2 from '@antv/g2';
import DataSet from '@antv/data-set';
import { recent } from '@/api/weather';
import { message } from 'antd';

G2.track(false);

export default function() {
  useEffect(() => {
    const chart = new G2.Chart({
      container: 'c1',
      forceFit: true,
      height: 700,
      background: {
        fill: '#394056',
      },
    });

    recent()
      .then(result => {
        const { data } = result;
        let max = 0;
        let min = 0;
        const source = data.map(item => {
          const result = {
            date: item.date,
            tem: parseInt(item.tem),
            tem1: parseInt(item.tem1),
            tem2: parseInt(item.tem2),
          };
          max = Math.max(result.tem1, max);
          min = Math.min(result.tem2, min);
          return result;
        });

        const ds = new DataSet();
        const dv = ds
          .createView()
          .source(source)
          .transform({
            type: 'rename',
            map: {
              tem: '平均温度',
              tem1: '最高温度',
              tem2: '最低温度',
            },
          })
          .transform({
            type: 'fold',
            fields: ['平均温度', '最高温度', '最低温度'],
            key: 'type',
            value: 'value',
          });
        chart.source(dv, {
          date: { alias: '日期' },
          value: { max, min },
        });
        chart.axis('date', {
          line: {
            lineWidth: 1,
            stroke: '#57617B',
            lineDash: 0,
          },
        });

        chart.axis('value', {
          line: {
            lineWidth: 1,
            stroke: '#57617B',
            lineDash: 0,
          },
          grid: {
            lineStyle: {
              stroke: '#57617B',
              lineWidth: 1,
              lineDash: 0,
            },
          },
        });

        chart.tooltip({
          crosshairs: {
            type: 'y',
            style: {
              stroke: '#57617B',
            },
          },
        });
        chart
          .line()
          .shape('smooth')
          .position('date*value')
          .color('type', ['rgb(137,189,27)', 'rgb(0, 136, 212)', 'rgb(219, 50, 51)'])
          .size(1);
        chart
          .area()
          .shape('smooth')
          .position('date*value')
          .color('type', [
            'l(90) 0:rgba(137,189,27, 0.3) 0.8:rgba(137,189,27, 0)',
            'l(90) 0:rgba(0, 136, 212, 0.3) 0.8:rgba(0, 136, 212, 0)',
            'l(90) 0:rgba(219, 50, 51, 0.3) 0.8:rgba(219, 50, 51, 0)',
          ])
          .style({
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10,
          })
          .tooltip(false);
        chart.render();
      })
      .catch(e => {
        message.error('数据接口调用失败：' + e);
      });
  }, []);

  return <div id="c1" />;
}
