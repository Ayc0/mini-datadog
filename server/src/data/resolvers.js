/* eslint no-unused-vars: off */

const { withFilter } = require('apollo-server');

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
    receiveRequest: {
      subscribe: () => subscribe([types.RECEIVE_REQUEST]),
    },
    metricsPerformed: {
      subscribe: withFilter(
        () => subscribe([types.METRICS_PERFORMED]),
        (payload, variables) =>
          variables.url === undefined ||
          payload.metricsPerformed.url === variables.url,
      ),
    },
    alertGenerated: {
      subscribe: withFilter(
        () => subscribe([types.ALERT_GENERATED]),
        (payload, variables) =>
          variables.url === undefined ||
          payload.alertGenerated.url === variables.url,
      ),
    },
  },
};

module.exports = resolvers;
