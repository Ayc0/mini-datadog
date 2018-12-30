const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar Timestamp

  type Query {
    getMonitorings: [Monitoring]
    getAlerts: [Alert]
  }

  type Mutation {
    addMonitoring(
      url: String!
      minutes: Int
      seconds: Int
      millis: Int
    ): Monitoring
  }

  type Subscription {
    monitoringAdded: Monitoring
    receiveRequest: Request
    metricsPerformed: Metrics
    alertGenerated: Alert
    alertResolved: Alert
  }

  type Monitoring {
    url: String!
    checkInterval: Int!
  }

  type Request {
    at: Timestamp!
    status: Int!
    error: Boolean!
    duration: Int!
  }

  type Metrics {
    url: String!
    lookupDuration: Int!
    at: Timestamp!
    lastStatus: Int!
    lastWasError: Boolean!
    mostFrequentStatus: Int!
    totalRequests: Int!
    totalDuration: Int!
    totalErrors: Int!
    averageServiceTime: Int!
    p50ServiceTime: Int!
    p90ServiceTime: Int!
    p95ServiceTime: Int!
    maxServiceTime: Int!
  }

  type Alert {
    at: Timestamp!
    url: String!
    availability: Float!
  }
`;

module.exports = typeDefs;
