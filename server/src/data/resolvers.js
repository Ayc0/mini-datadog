/* eslint no-unused-vars: off */

const { getMonitorings, addMonitoring } = require('../controllers/monitoring');
const { getAlerts } = require('../controllers/alerts');
const { emit, subscribe, types } = require('./actions');

const resolvers = {
  Query: {
    getMonitorings(root, args, context) {
      return getMonitorings();
    },
    getAlerts(root, args, context) {
      return getAlerts();
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
    metricsPerformed: {
      subscribe: () => subscribe([types.METRICS_PERFORMED]),
    },
    receiveRequest: {
      subscribe: () => subscribe([types.RECEIVE_REQUEST]),
    },
    alertGenerated: {
      subscribe: () => subscribe([types.ALERT_GENERATED]),
    },
    alertResolved: {
      subscribe: () => subscribe([types.ALERT_RESOLVED]),
    },
  },
};

module.exports = resolvers;
