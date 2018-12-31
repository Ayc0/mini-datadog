import { round, cut } from './math';

const formatTime = timestamp => {
  // millis
  if (Math.log(timestamp) / Math.log(10) < 3) {
    return `${timestamp}ms`;
  }
  timestamp /= 1000;

  // sec
  if (timestamp < 60) {
    return `${cut(timestamp)}s`;
  }
  timestamp /= 60;

  // min
  if (timestamp < 60) {
    const min = round(timestamp);
    const sec = round((timestamp - min) * 60);
    return `${min}min${sec}s`;
  }
  timestamp /= 60;

  // hours
  const hour = round(timestamp);
  const min = round((timestamp - hour) * 60);
  return `${hour}h${min}min`;
};

export default formatTime;
