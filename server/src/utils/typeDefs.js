const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    getMonitorings: [Monitoring]
  }

  type Mutation {
    addMonitoring(
      url: String!
      hours: Int
      minutes: Int
      seconds: Int
      millis: Int
    ): Monitoring
  }

  type Subscription {
    monitoringAdded: Monitoring
  }

  type Monitoring {
    url: String!
    checkInterval: Int!
  }
`;

module.exports = typeDefs;
