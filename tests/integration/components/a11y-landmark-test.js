import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import LANDMARK_NAVIGATION_ROLES, { VALID_ROLES } from 'ember-a11y-landmarks/utils/landmark-navigation-roles';
import set from 'ember-metal/set';
import run from 'ember-runloop';

moduleForComponent('a11y-landmark', 'Integration | Component | a11y landmark', {
  integration: true
});

test('default tagname and role', function(assert) {
  this.render(hbs`
    {{#a11y-landmark}}
      default landmark
    {{/a11y-landmark}}
  `);

  assert.equal(this.$('div').text().trim(), 'default landmark', 'renders div by default');
  assert.equal(this.$('div').attr('role'), 'region', 'landmark role is region by default');
});

test('search form', function(assert) {
  this.render(hbs`
    {{#a11y-landmark tagName='form' landmarkRole='search'}}
      search form
    {{/a11y-landmark}}
  `);

  assert.equal(this.$('form').text().trim(), 'search form', 'renders form');
  assert.equal(this.$('form').attr('role'), 'search', 'landmark role is search');
});

test('sets role automatically for each landmark', function(assert) {
  const landmarks = Object.keys(LANDMARK_NAVIGATION_ROLES);

  assert.expect(landmarks.length);

  landmarks.forEach((landmark) => {
    run(() => { set(this, 'tagName', landmark); });

    this.render(hbs`
      {{#a11y-landmark tagName=tagName}}
        automatic
      {{/a11y-landmark}}
    `);

    let landmarkRole = LANDMARK_NAVIGATION_ROLES[landmark];

    assert.equal(this.$(landmark).attr('role'), landmarkRole, `landmark role for ${landmark} is ${landmarkRole}`);
  });
});

test('asserts form role', function(assert) {
  const expectedErrorMessage = 'Use a form element for forms.';

  assert.expectAssertion(() => {
    this.render(hbs`
      {{#a11y-landmark landmarkRole='form'}}
        assert form
      {{/a11y-landmark}}
    `);
  }, expectedErrorMessage);
});

test('errors when tagName value is not a landmark navigation role', function(assert) {
  const validLandmarks = Object.keys(LANDMARK_NAVIGATION_ROLES).join(', ');
  const expectedErrorMessage = `Assertion Failed: Invalid tagName "someInvalidTagName". Must be one of ${validLandmarks}.`;

  assert.expectAssertion(() => {
    this.render(hbs`
      {{#a11y-landmark tagName='someInvalidTagName'}}
        restricted
      {{/a11y-landmark}}
    `);
  }, expectedErrorMessage);
});

test('errors when landmarkRole is not a valid role', function(assert) {
  const validRoles = VALID_ROLES.join(', ');
  const expectedErrorMessage =  `Invalid landmarkRole "someInvalidRole". Must be one of ${validRoles}.`;

  assert.expectAssertion(() => {
    this.render(hbs`
      {{#a11y-landmark landmarkRole='someInvalidRole'}}
        invalid role
      {{/a11y-landmark}}
    `);
  }, expectedErrorMessage);
});

test('warns when landmarkRole is set for a landmark that is not a div or a form', function(assert) {
  const expectedWarningMessage =  "Setting landmarkRole is not required when the landmark is not a div or a form";

  assert.logs('warn', expectedWarningMessage, () => {
    this.render(hbs`
      {{#a11y-landmark tagName='nav' landmarkRole='banner'}}
        not div or form
      {{/a11y-landmark}}
    `);
  });
});

test('errors when landmarkRole is not "form" or "search" for a "form" landmark', function(assert) {
  const expectedErrorMessage =  'Invalid landmarkRole "main". Should be "form" or "search" for a "form" landmark.';

  assert.expectAssertion(() => {
    this.render(hbs`
      {{#a11y-landmark tagName='form' landmarkRole='main'}}
        invalid form
      {{/a11y-landmark}}
    `);
  }, expectedErrorMessage);
});
