const { PubSub } = require('apollo-server');

const TYPES = {
  MONITORING_ADDED: 'MONITORING_ADDED',
};

const pubsub = new PubSub();

const isValidType = type => type in TYPES;

const subscribe = types => {
  const validTypes = types.filter(isValidType);
  return pubsub.asyncIterator(types);
};

const emit = {
  monitoringAdded: monitoring =>
    pubsub.publish(TYPES.MONITORING_ADDED, { monitoringAdded: monitoring }),
};

module.exports = {
  types: TYPES,
  subscribe,
  emit,
};
