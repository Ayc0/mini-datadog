/* eslint no-unused-vars: off */

const { getMonitorings, addMonitoring } = require('../controllers/monitoring');
const { emit, subscribe, types } = require('../utils/actions');

const resolvers = {
  Query: {
    getMonitorings(root, args, context) {
      return getMonitorings();
    },
  },
  Mutation: {
    addMonitoring(root, args, context) {
      const monitoring = addMonitoring(args);
      emit.monitoringAdded(monitoring);
      return monitoring;
    },
  },
  Subscription: {
    monitoringAdded: {
      subscribe: () => subscribe([types.MONITORING_ADDED]),
    },
    receiveMetrics: {
      subscribe: () => subscribe([types.RESULTS_PERFORMED]),
    },
  },
};

module.exports = resolvers;
