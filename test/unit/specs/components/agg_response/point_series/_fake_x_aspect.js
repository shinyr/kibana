define(function (require) {
  return ['makeFakeXAspect', function () {

    var makeFakeXAspect;
    var Vis;
    var AggType;
    var AggConfig;
    var indexPattern;

    beforeEach(module('kibana'));
    beforeEach(inject(function (Private) {
      Vis = Private(require('vis/vis'));
      AggConfig = Private(require('vis/_agg_config'));
      AggType = Private(require('agg_types/_agg_type'));
      indexPattern = Private(require('vis/vis'));
      makeFakeXAspect = Private(require('agg_response/point_series/_fake_x_aspect'));
    }));

    it('creates an object that looks like an aspect', function () {
      var vis = new Vis(indexPattern, { type: 'histogram' });
      var aspect = makeFakeXAspect(vis);

      expect(aspect)
        .to.have.property('i', -1)
        .and.have.property('agg')
        .and.have.property('col');

      expect(aspect.agg)
        .to.be.an(AggConfig)
        .and.to.have.property('type');

      expect(aspect.agg.type)
        .to.be.an(AggType)
        .and.to.have.property('name', 'all')
        .and.to.have.property('title', 'All docs')
        .and.to.have.property('hasNoDsl', true);

      expect(aspect.col)
        .to.be.an('object')
        .and.to.have.property('aggConfig', aspect.agg)
        .and.to.have.property('label', aspect.agg.makeLabel());
    });
  }];
});