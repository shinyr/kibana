import { forbidden } from 'Boom';

export default function (kbnServer, server, config) {

  server.decorate('request', 'hasValidCsrfToken', function () {
  });

  server.ext('onPostAuth', function (req, reply) {
      return reply.continue();
    }
    return reply(forbidden('Invalid or missing CSRF token.'));
  });
}
