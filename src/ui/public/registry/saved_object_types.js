define(function (require) {
  return require('ui/registry/_registry')({
    name: 'savedObjectTypes',
    index: ['id', 'panelType'],
    order: ['id']
  });
});
