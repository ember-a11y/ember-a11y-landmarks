import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('a11y-landmark', 'Unit | Component | a11y landmark', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

function buildEmberAssertion(message) {
  return {
    "code": undefined,
    "description": undefined,
    "fileName": undefined,
    "lineNumber": undefined,
    "message": `Assertion Failed: ${message}`,
    "name": "Error",
    "number": undefined
  };
}

test('it determines ariaRole with valid tagName', function(assert) {
  const component = this.subject({
    tagName: 'form'
  });
  const ariaRole = component.get('ariaRole');

  assert.equal(ariaRole, 'form');
});

test('it determines ariaRole with valid landmarkRole', function(assert) {
  const component = this.subject({
    landmarkRole: 'region'
  });
  const ariaRole = component.get('ariaRole');

  assert.equal(ariaRole, 'region');
});

test('it determines ariaRole when tagName is "form" and landmarkRole is "search"', function(assert) {
  const component = this.subject({
    tagName: 'form',
    landmarkRole: 'search'
  });
  const ariaRole = component.get('ariaRole');

  assert.equal(ariaRole, 'search');
});

test('it fails to determine ariaRole when landmarkRole is "form"', function(assert) {
  const expectedErrorMessage = 'Use a form element for forms.';

  assert.throws(() => {
    const component = this.subject({
      landmarkRole: 'form'
    });
    component.get('ariaRole');
  }, buildEmberAssertion(expectedErrorMessage));
});

test('it fails to determine ariaRole when tagName is invalid', function(assert) {
  const expectedErrorMessage = 'Invalid tagName "someInvalidTagName". Must be one of aside, footer, form, header, main, nav, div.';

  assert.throws(() => {
    const component = this.subject({tagName: 'someInvalidTagName'});
    component.get('ariaRole');
  }, buildEmberAssertion(expectedErrorMessage));
});

test('it fails to determine ariaRole when landmarkRole is invalid', function(assert) {
  const expectedErrorMessage = 'Invalid tagName \"someInvalidLandmarkRole\". Must be one of banner, navigation, complementary, main, contentinfo, search, application, document, region.';

  assert.throws(() => {
    const component = this.subject({landmarkRole: 'someInvalidLandmarkRole'});
    component.get('ariaRole');
  }, buildEmberAssertion(expectedErrorMessage));
});

test('it fails to determine ariaRole when tagName and landmarkRole are both provided', function(assert) {
  const expectedErrorMessage = 'Cannot set both \"tagName\" and \"landMarkRole. Use one or the other.';

  assert.throws(() => {
    const component = this.subject({
      landmarkRole: 'form',
      tagName: 'form'
    });
    component.get('ariaRole');
  }, buildEmberAssertion(expectedErrorMessage));
});

test('it fails to determine ariaRole when neither tagName nor landmarkRole are provided', function(assert) {
  const expectedErrorMessage = 'Must specify either tagName or landmarkRole';

  assert.throws(() => {
    const component = this.subject();
    component.get('ariaRole');
  }, buildEmberAssertion(expectedErrorMessage));
});
