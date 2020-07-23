import {useState, useEffect} from 'react';
import {getFormatCountDown} from '../../../core/utils/stuff';

export const useCountDownResend = () => {
  const fiveMinutesInSecond = 5 * 60;

  const [timeLeft, setTimeLeft] = useState(fiveMinutesInSecond);

  useEffect(() => {
    const countDown = setInterval(() => {
      setTimeLeft(prevNumber => {
        if (prevNumber <= 0) {
          return prevNumber;
        }
        return prevNumber - 1;
      });
    }, 1000);

    return () => {
      clearInterval(countDown);
    };
  }, []);

  const getTimeLeft = (): string => {
    return getFormatCountDown(timeLeft);
  };

  const resetTime = () => {
    setTimeLeft(() => fiveMinutesInSecond);
  };

  const isAvalibleResend = timeLeft <= 0;

  return {getTimeLeft, resetTime, isAvalibleResend};
};
