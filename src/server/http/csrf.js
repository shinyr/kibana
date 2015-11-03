import { forbidden } from 'Boom';
import { get, noop } from 'lodash';
import { attempt, fromNode as fn } from 'bluebird';
import jwt from 'jsonwebtoken';

export default function (kbnServer, server, config) {
  const jwtSecret = config.get('server.csrf.secret');
  const jwtHeader = config.get('server.csrf.header');
  const jwtOptions = {
    expiresIn: config.get('server.csrf.tokenTTLSec')
  };

  server.decorate('request', 'validateCsrf', async function () {
    if (this.method === 'get' || this.path === '/api/token') return true;

    const submission = this.headers[jwtHeader];
    if (!submission) throw forbidden('Missing CSRF token.');

    try {
      await fn(cb => jwt.verify(submission, jwtSecret, jwtOptions, cb));
    } catch (err) {
      throw forbidden(err.message);
    }
  });

  server.ext('onPostAuth', function (req, reply) {
    req.validateCsrf()
    .then((valid) => reply.continue())
    .catch(reply);
  });

  server.route({
    method: 'POST',
    path: '/api/token',
    handler: function (req, reply) {
      attempt(function () {
        return get(server, ['plugins', 'kibana', 'requireIndexForRequest'], noop)(req);
      })
      .then(() => {
        const payload = {
          org: req.headers.origin,
          authz: req.headers.authorize
        };
        const token = jwt.sign(payload, jwtSecret, jwtOptions);
        reply({ ok: true }).header(jwtHeader, token);
      })
      .catch(reply);
    }
  });
}
