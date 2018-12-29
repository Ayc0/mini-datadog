const NODE_ENV = process.env.NODE_ENV;

const isDev =
  NODE_ENV === undefined || NODE_ENV === 'dev' || NODE_ENV === 'development';

const isProd = NODE_ENV === 'prod' || NODE_ENV === 'production';

const isTest = NODE_ENV === 'test';

module.exports = {
  isDev,
  isProd,
  isTest,
};
