const { PubSub } = require('apollo-server');

const TYPES = {
  MONITORING_ADDED: 'MONITORING_ADDED',
  METRICS_PERFORMED: 'METRICS_PERFORMED',
  RECEIVE_REQUEST: 'RECEIVE_REQUEST',
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
  metricsPerformed: metrics =>
    pubsub.publish(TYPES.METRICS_PERFORMED, { metricsPerformed: metrics }),
  receiveRequest: request =>
    pubsub.publish(TYPES.RECEIVE_REQUEST, { receiveRequest: request }),
};

module.exports = {
  types: TYPES,
  subscribe,
  emit,
};
