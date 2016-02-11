import decodeGeoHash from 'ui/utils/decode_geo_hash';
import AggConfigResult from 'ui/Vis/AggConfigResult';
import _ from 'lodash';

function getAcr(val) {
  return val instanceof AggConfigResult ? val : null;
}

function unwrap(val) {
  return getAcr(val) ? val.value : val;
}

function convertRowsToFeatures(table, geoI, metricI) {
  return _.transform(table.rows, function (features, row) {
    var geohash = unwrap(row[geoI]);
    var bucket = geohash.bucket;
    geohash = geohash.toString();
    if (!geohash) return;

    // fetch latLn of northwest and southeast corners, and center point
    var location = decodeGeoHash(geohash);

    var centerLatLng = [
      bucket.geohashsubagg.location.lat,
      bucket.geohashsubagg.location.lon
    ];

    // order is nw, ne, se, sw
    var rectangle = [
      [location.latitude[0], location.longitude[0]],
      [location.latitude[0], location.longitude[1]],
      [location.latitude[1], location.longitude[1]],
      [location.latitude[1], location.longitude[0]],
    ];

    // geoJson coords use LngLat, so we reverse the centerLatLng
    // See here for details: http://geojson.org/geojson-spec.html#positions
    features.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: centerLatLng.slice(0).reverse()
      },
      properties: {
        geohash: geohash,
        value: unwrap(row[metricI]),
        aggConfigResult: getAcr(row[metricI]),
        center: centerLatLng,
        rectangle: rectangle
      }
    });
  }, []);
}

export default convertRowsToFeatures;
