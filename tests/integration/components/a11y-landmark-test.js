import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('a11y-landmark', 'Integration | Component | a11y landmark', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{a11y-landmark}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#a11y-landmark}}
      template block text
    {{/a11y-landmark}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
