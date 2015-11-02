import { createHash } from 'crypto';
import { forbidden } from 'Boom';

export default function (kbnServer, server, config) {
  const csrfTokenSalt = config.get('server.csrf.tokenSalt');
  const hash = (val) => createHash('sha1').update(val).digest('hex');

  server.decorate('request', 'getCsrfToken', function () {
    return this.session.get('csrfToken');
  });

  server.decorate('request', 'generateCsrfToken', function () {
    const sessionId = this.session.id;
    const csrfTokenCount = ((this.session.get('csrfTokenCount') || 0) + 1) % 100000;
    const csrfToken = hash(Date.now() + sessionId + csrfTokenCount + csrfTokenSalt);

    this.session.set({ csrfToken, csrfTokenCount });

    return csrfToken;
  });

  server.decorate('request', 'hasValidCsrfToken', function () {
    const submission = this.headers['x-csrf-token'];
    return this.getCsrfToken() === submission;
  });

  server.ext('onPostAuth', function (req, reply) {
    if (req.method === 'get' || req.hasValidCsrfToken()) {
      return reply.continue();
    }

    return reply(forbidden('Invalid or missing CSRF token.'));
  });
}
