import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('a11y-landmark', 'Integration | Component | a11y landmark', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{#a11y-landmark tagName="form"}}
      template block text
    {{/a11y-landmark}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
