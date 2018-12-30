const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar Timestamp

  type Query {
    getMonitorings: [Monitoring]
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
`;

module.exports = typeDefs;
