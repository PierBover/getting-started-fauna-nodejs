const faunadb = require('faunadb');
const FaunaError = require('../errors/FaunaError.js');

// We do this so that our FQL code is cleaner
const {Create, Collection} = faunadb.query;

module.exports = {
  // Validation schema for the Fastify route
  schema: {
    body: {
      type: 'object',
      required: ['username', 'password'],
      properties: {
        username: {type: 'string'},
        password: {
          type: 'string',
          minLength: 10
        }
      }
    }
  },
  async handler (request, reply) {

    const {username, password} = request.body;

    // FAUNA_SERVER_SECRET comes from our .env file
    const client = new faunadb.Client({
      secret: process.env.FAUNA_SERVER_SECRET
    });

    try {

      // Create a new user document with credentials
      const result = await client.query(
        Create(
          Collection('Users'),
          {
            data: {username},
            credentials: {password}
          }
        )
      );

      // Return the created document
      reply.send(result);

    } catch (error) {
      throw new FaunaError(error);
    }
  }
};