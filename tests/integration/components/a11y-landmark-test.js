import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | a11y landmark', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      <A11y-landmark @tagName="form">
        template block text
      </A11y-landmark>
    `);

    assert.equal(find('*').textContent.trim(), 'template block text');
  });
});
