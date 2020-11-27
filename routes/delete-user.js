const faunadb = require('faunadb');
const FaunaError = require('../errors/FaunaError.js');

// We do this so that our FQL code is cleaner
const {Delete, Ref, Collection} = faunadb.query;

module.exports = {
  config: {
    isPrivate: true
  },
  async handler (request, reply) {

    const userId = request.params.userId;

    // request.faunaSecret is created in the private hook
    const client = new faunadb.Client({
      secret: request.faunaSecret
    });

    try {

      // Delete the user document
      const resultDelete = await client.query(
        Delete(
          Ref(
            Collection('Users'),
            userId
          )
        )
      );

      // Return the deleted document
      reply.send(resultDelete);

    } catch (error) {
      throw new FaunaError(error);
    }
  }
};