import { round, cut } from './math';

const differentThan0 = (number, text) => (number !== 0 ? text : '');

const formatTime = timestamp => {
  // millis
  if (timestamp < 1000) {
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
    return `${min}min${differentThan0(sec, `${sec}s`)}`;
  }
  timestamp /= 60;

  // hours
  const hour = round(timestamp);
  const min = round((timestamp - hour) * 60);
  return `${hour}h${differentThan0(min, `${min}min`)}`;
};

export default formatTime;
