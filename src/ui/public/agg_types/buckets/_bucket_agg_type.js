import _ from 'lodash';
import AggTypesAggTypeProvider from 'ui/agg_types/AggType';
export default function BucketAggTypeProvider(Private) {
  var AggType = Private(AggTypesAggTypeProvider);

  _.class(BucketAggType).inherits(AggType);
  function BucketAggType(config) {
    BucketAggType.Super.call(this, config);

    if (_.isFunction(config.getKey)) {
      this.getKey = config.getKey;
    }
  }

  BucketAggType.prototype.getKey = function (bucket, key) {
    return {
      bucket,
      toString() {
        return key || bucket.key;
      }
    };
  };

  return BucketAggType;
};
