import { round } from './math';

// eslint-disable-next-line
export const statusColor = status => {
  switch (round(status / 100)) {
    case 1:
      return 'cyan';
    case 2:
      return 'green';
    case 3:
      return 'yellow';
    default:
      return 'red';
  }
};
