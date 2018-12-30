const { ApolloServer } = require('apollo-server');

const typeDefs = require('./data/typeDefs');
const resolvers = require('./data/resolvers');
const { emit } = require('./data/actions');
const { verifySchema, verifyEmitters } = require('./utils/verifySchema');
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
