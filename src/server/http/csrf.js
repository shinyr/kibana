import { forbidden } from 'boom';

export default function (kbnServer, server, config) {
  server.ext('onPostAuth', function (req, reply) {
    if (req.method === 'get' || req.headers['kibana-csrf'] === 'true') {
      return reply.continue();
    }

    reply(forbidden('missing kibana csrf header'));
  });
}
