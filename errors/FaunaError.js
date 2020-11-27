class FaunaError extends Error {
  constructor (error) {
    super();

    const {name, message} = error;

    this.name = name;
    this.message = message;
    this.status = 500;

    if (name === 'BadRequest' && message === 'instance not unique'){
      this.status = 409;
    }

    if (name === 'BadRequest' && message === 'authentication failed') {
      this.status = 401;
    }

    if (name === 'Unauthorized') {
      this.status = 401;
    }

    if (name === 'NotFound') {
      this.status = 404;
    }

    if (name === 'PermissionDenied') {
      this.status = 403;
    }
  }

  toString () {
    // We're following Fastify's convention so that all server errors look the same
    return JSON.stringify({
      error: this.name,
      message: this.message,
      statusCode: this.status
    });
  }
}

module.exports = FaunaError;