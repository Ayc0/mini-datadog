const kleur = require('kleur');

const getQueries = ({ definitions }) =>
  definitions
    .filter(definition => definition.name.value === 'Query')
    .map(definition => definition.fields.map(field => field.name.value))
    .reduce((names, subNames) => [...names, ...subNames], []);

const getMutations = ({ definitions }) =>
  definitions
    .filter(definition => definition.name.value === 'Mutation')
    .map(definition => definition.fields.map(field => field.name.value))
    .reduce((names, subNames) => [...names, ...subNames], []);

const getSubscriptions = ({ definitions }) =>
  definitions
    .filter(definition => definition.name.value === 'Subscription')
    .map(definition => definition.fields.map(field => field.name.value))
    .reduce((names, subNames) => [...names, ...subNames], []);

const verifySchema = (typeDefs, resolvers) => {
  const toCheck = [
    [getQueries(typeDefs), 'Query'],
    [getMutations(typeDefs), 'Mutation'],
    [getSubscriptions(typeDefs), 'Subscription'],
  ];
  let errors = false;

  toCheck.forEach(([types, Type]) => {
    if (types.length !== 0) {
      if (!resolvers[Type]) {
        errors = true;
        console.warn(
          kleur.yellow(`You need to implement ${kleur.bold().red(Type)}`),
        );
      } else {
        types.forEach(request => {
          if (request in resolvers[Type]) {
            return;
          }
          errors = true;
          console.warn(
            kleur.yellow(
              `You need to implement ${kleur
                .bold()
                .red(request)} in ${kleur.bold().red(Type)}`,
            ),
          );
        });
      }
    }
  });
};

const verifyEmitters = (typeDefs, emitters) => {
  let errors = false;
  const subscriptions = getSubscriptions(typeDefs);
  for (let emitter in emitters) {
    if (subscriptions.includes(emitter)) {
      return;
    }
    errors = true;
    console.warn(
      kleur.yellow(
        `You've never defined ${kleur
          .bold()
          .red(emitter)} in your subscriptions`,
      ),
    );
  }
};

module.exports = {
  getQueries,
  getMutations,
  getSubscriptions,
  verifySchema,
  verifyEmitters,
};
