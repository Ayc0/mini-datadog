const { PubSub } = require('apollo-server');

const TYPES = {
  MONITORING_ADDED: 'MONITORING_ADDED',
  RESULTS_PERFORMED: 'RESULTS_PERFORMED',
};

const pubsub = new PubSub();

const isValidType = type => type in TYPES;

const subscribe = types => {
  const validTypes = types.filter(isValidType);
  return pubsub.asyncIterator(validTypes);
};

const emit = {
  monitoringAdded: monitoring =>
    pubsub.publish(TYPES.MONITORING_ADDED, { monitoringAdded: monitoring }),
  receiveMetrics: metrics =>
    pubsub.publish(TYPES.RESULTS_PERFORMED, { receiveMetrics: metrics }),
};

module.exports = {
  types: TYPES,
  subscribe,
  emit,
};
