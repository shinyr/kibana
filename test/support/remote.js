import { forOwn } from 'lodash';

export function decorateRemote(remote) {
  const timeouts = {
    script: 'ExecuteAsync',
    implicit: 'Find',
    'page load': 'PageLoad'
  };

  forOwn(timeouts, (name, type) => {
    remote[`with${name}Timeout`] = async function withSomeTimeout(timeout, block) {
      const initialTimeout = await remote.getTimeout(type);
      await remote.setTimeout(type, timeout);
      const ret = await block();
      await remote.setTimeout(type, initialTimeout);
      return ret;
    };
  });
}
