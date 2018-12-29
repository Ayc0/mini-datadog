const { PubSub } = require('apollo-server');

const { getMonitorings, addMonitoring } = require('./controllers/monitoring');

const pubsub = new PubSub();

const MONITORING_ADDED = 'MONITORING_ADDED';

const resolvers = {
  Query: {
    getMonitorings(root, args, context) {
      return getMonitorings();
    },
  },
  Mutation: {
    addMonitoring(root, args, context) {
      const monitoring = addMonitoring(args);
      pubsub.publish(MONITORING_ADDED, { monitoringAdded: monitoring });
      return monitoring;
    },
  },
  Subscription: {
    monitoringAdded: {
      subscribe: () => pubsub.asyncIterator([MONITORING_ADDED]),
    },
  },
};

module.exports = resolvers;
