// Speed up time 🚀
jest.mock('./src/utils/times');

// Mock date
const constantDateTime = new Date('2016-01-01T01:01:01.000Z').getTime();

global.Date = class extends Date {
  constructor() {
    super(constantDateTime);
  }
};
global.Date.now = () => constantDateTime;
