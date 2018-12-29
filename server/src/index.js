const { ApolloServer, PubSub } = require('apollo-server');

const typeDefs = require('./utils/typeDefs');
const resolvers = require('./utils/resolvers');
const { verifySchema, verifyEmitters } = require('./utils/verifySchema');
const { emit } = require('./utils/actions');
const { isProd } = require('./utils/env');

if (!isProd) {
  verifySchema(typeDefs, resolvers);
  verifyEmitters(typeDefs, emit);
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
