import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('a11y-landmark', 'Unit | Component | a11y landmark', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('it initializes with valid properties', function(assert) {
  assert.expect(0);
  
  this.subject({
    tagName: 'form',
    landmarkRole: 'search'
  });
});

test('it fails to init when tagName is invalid', function(assert) {
  const expectedErrorMessage = 'Assertion Failed: Invalid tagName "someInvalidTagName". Must be one of aside, footer, form, header, main, nav, div.';

  assert.throws(() => {
    this.subject({tagName: 'someInvalidTagName'});
  }, error => error.message === expectedErrorMessage);
});

test('it fails to init when landmarkRole is invalid', function(assert) {
  const expectedErrorMessage = 'Assertion Failed: Invalid tagName \"someInvalidLandmarkRole\". Must be one of banner, navigation, aside, main, form, search, application, document, region.';

  assert.throws(() => {
    this.subject({landmarkRole: 'someInvalidLandmarkRole'});
  }, error => error.message === expectedErrorMessage);
});
