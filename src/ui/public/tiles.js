import { format as formatUrl, parse as parseUrl } from 'url';
import { join } from 'path';
import marked from 'marked';
marked.setOptions({
  gfm: true, // Github-flavored markdown
  sanitize: true // Sanitize HTML tags
});

import chrome from 'ui/chrome';
import uiRoutes from 'ui/routes';

function UiTilesProvider($http) {
  this.tileServiceUrl = chrome.getInjected('tileServiceUrl');
  this.manifestUrl = modifyUrl(this.tileServiceUrl, url => (
    {
      ...url,
      pathname: join(url.pathname, 'index.json'),
    }
  ));

  // read the manifest published by the tile service and consume it's properties
  this.loadManifest = () => {
    return $http.get(this.manifestUrl)
    .then(({ data }) => {
      // since these values are not currently available in the manifest:
      data.attribution = '© [Elastic Tile Service](https://www.elastic.co/elastic_tile_service_tos)';
      data.subdomains = [];
      data.tileurl = 'https://tiles.elastic.co/v1/default/{z}/{x}/{y}.png';

      this.applyManifest(data);
    });
  };

  // apply the properties of the manifest to expose it's values to the application
  this.applyManifest = manifest => {
    this.minZoom = manifest.minzoom;
    this.maxZoom = manifest.maxzoom - 3;
    this.tilePattern = modifyUrl(manifest.tileurl, url => ({
      ...url,
      pathname: decodeURI(url.pathname),
      query: {
        ...url.query,
        elastic_tile_service_tos: 'agree',
        my_app_name: 'kibana'
      }
    }));
    this.leafletLayerOptions = {
      attribution: marked(manifest.attribution),
      subdomains: manifest.subdomains
    };
  };
}

uiRoutes.addSetupWork(Private => {
  const tiles = Private(UiTilesProvider);
  return tiles.loadManifest();
});

function modifyUrl(url, block) {
  const { protocol, hostname, port, pathname, query } = parseUrl(url, true);
  return formatUrl(block({ protocol, hostname, port, pathname, query }));
}

export default UiTilesProvider;
