import React, { useRef, useState, useEffect } from 'react';
import { Progress } from 'reactstrap';

type IAnimatedProgress = {
  value: number;
  divide: number;
};

const AnimatedProgress = (props: IAnimatedProgress) => {
  const { value, divide } = props;
  const interval = useRef(null);
  const [display, setDisplay] = useState(0);

  const points = Math.round(value / divide);

  useEffect(() => {
    interval.current && clearInterval(interval.current);
    interval.current = setInterval(() => {
      setDisplay((val) => {
        if (val >= points) {
          clearInterval(interval.current);
          return points;
        }
        return val + 1;
      });
    }, 30);
    return () => clearInterval(interval.current);
  }, [value]);

  return <Progress className="mb-4" value={display} />;
};

export default AnimatedProgress;
