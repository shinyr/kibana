
export default function requireIndexForRequestProvider(server) {
  const config = server.config();

  return function requireIndexForRequest(req) {
    const { callWithRequest } = server.plugins.elasticsearch;
    return callWithRequest(req, 'indices.get', {
      index: config.get('kibana.index')
    });
  };
}
