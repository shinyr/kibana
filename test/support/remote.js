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
      let ret;
      let err;
      let errored = true;

      try {
        ret = await block();
        errored = false;
      } catch (_err) {
        err = _err;
      } finally {
        await remote.setTimeout(type, initialTimeout);
      }

      if (errored) throw err;
      else return ret;
    };
  });
}
