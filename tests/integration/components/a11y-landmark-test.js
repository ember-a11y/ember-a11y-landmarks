import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import LANDMARK_NAVIGATION_ROLES from 'ember-a11y-landmarks/utils/landmark-navigation-roles';
import set from 'ember-metal/set';
import run from 'ember-runloop';

moduleForComponent('a11y-landmark', 'Integration | Component | a11y landmark', {
  integration: true
});

test('defaults when no tagName or landmarkRole specified', function(assert) {
  this.render(hbs`
    {{#a11y-landmark}}
      default landmark
    {{/a11y-landmark}}
  `);

  assert.equal(this.$('div').attr('role'), 'region', 'landmark role is search');
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

test('sets role for each landmark', function(assert) {
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
  const expectedErrorMessage = 'Set the tagName to form, not the landmarkRole.';

  assert.expectAssertion(() => {
    this.render(hbs`
      {{#a11y-landmark landmarkRole='form'}}
        assert form
      {{/a11y-landmark}}
    `);
  }, expectedErrorMessage);
});

test('errors when tagName value is not a landmark navigation role', function(assert) {
  const expectedErrorMessage = "Assertion Failed: Invalid tagName \"someInvalidTagName\". Must be one of aside, footer, form, header, main, nav, div.";

  assert.expectAssertion(() => {
    this.render(hbs`
      {{#a11y-landmark tagName='someInvalidTagName'}}
        tagName not landmark navigation role
      {{/a11y-landmark}}
    `);
  }, expectedErrorMessage);
});

test('errors when landmarkRole is not a valid role', function(assert) {
  const expectedErrorMessage =  "Assertion Failed: Invalid landmarkRole \"someInvalidRole\". Must be one of application, banner, complementary, contentinfo, document, main, navigation, region, search.";

  assert.expectAssertion(() => {
    this.render(hbs`
      {{#a11y-landmark landmarkRole='someInvalidRole'}}
        invalid role
      {{/a11y-landmark}}
    `);
  }, expectedErrorMessage);
});

test('errors when landmarkRole is not "form" or "search" for a "form" landmark', function(assert) {
  const expectedErrorMessage =  "Assertion Failed: Cannot set both \"tagName\" and \"landMarkRole.\" Use one or the other.";

  assert.expectAssertion(() => {
    this.render(hbs`
      {{#a11y-landmark tagName='form' landmarkRole='main'}}
        invalid form
      {{/a11y-landmark}}
    `);
  }, expectedErrorMessage);
});
