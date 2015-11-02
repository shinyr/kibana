import Yar from 'yar';
import { fromNode as fn } from 'bluebird';

export default async function (kbnServer, server, config) {
  await fn(cb => server.register({
    register: Yar,
    options: {
      storeBlank: false,
      ignoreErrors: false,
      clearInvalid: true,
      cookieOptions: {
        password: config.get('server.sessions.cookiePassword'),
        isSecure: Boolean(config.get('server.ssl.cert') && config.get('server.ssl.key'))
      },
      cache: {
        cache: 'sessionCache'
      }
    }
  }, cb));
}
