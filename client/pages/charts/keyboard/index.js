import React, { useState, useEffect } from 'react';
import Keyboard from '@/assets/components/Charts/Keyboard';
import { Button } from 'antd';

export default function() {
  const [dance, setDance] = useState(false);
  const [data, setData] = useState(() => {
    const data = [];
    for (let i = 0; i < 50; i++) {
      let y1 = (Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5;
      let y2 = (Math.sin(i / 5) * (i / 5 + 10) + i / 6) * 3;
      let x = i;
      data.push({ x, y1, y2 });
    }
    return data;
  });

  useEffect(() => {
    let timer;
    if (dance) {
      timer = setInterval(() => {
        const data = [];
        for (let i = 0; i < 50; i++) {
          let y1 = (Math.sin(i / 5) * (i / 5 - 10) + i / 6) * Math.random() * 3;
          let y2 = (Math.sin(i / 5) * (i / 5 + 10) + i / 6) * Math.random() * 3;
          let x = i;
          data.push({ x, y1, y2 });
        }
        setData(data);
      }, 500);
    }
    return () => {
      timer && clearInterval(timer);
    };
  }, [dance]);

  const onClick = e => {
    setDance(!dance);
  };

  return (
    <div>
      <Button onClick={onClick} type={dance ? 'danger' : 'primary'}>
        {dance ? 'Stop' : 'Dance'}
      </Button>
      <Keyboard data={data} height={700} />
    </div>
  );
}
