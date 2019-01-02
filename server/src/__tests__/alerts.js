const { TEN_SEC, TWO_MIN } = require('../utils/times.js');
const { handleAlerts, getAlerts } = require('../controllers/alerts');

const wrongMetric = { totalErrors: 30, totalRequests: 100, url: 'url' };
const rightMetric = { totalErrors: 10, totalRequests: 100, url: 'url' };

const alert = {
  at: Date.now(),
  url: 'url',
  availability: 0.7,
  resolved: false,
};
const resolution = {
  at: Date.now(),
  url: 'url',
  availability: 0.9,
  resolved: true,
};

const wait = timeout => new Promise(res => setTimeout(() => res(), timeout));

test('alerts are trigger', async () => {
  handleAlerts(wrongMetric);
  await wait(TWO_MIN * 2);
  expect(getAlerts()).toEqual([alert]);
});

test('resolutions are trigger', async () => {
  handleAlerts(rightMetric);
  await wait(TWO_MIN * 2);
  expect(getAlerts()).toEqual([alert, resolution]);
});

test('alerts can be canceled', async () => {
  handleAlerts(wrongMetric);
  await wait(TEN_SEC);
  handleAlerts(rightMetric);
  await wait(TWO_MIN * 2);
  expect(getAlerts()).toEqual([alert, resolution]);
});
