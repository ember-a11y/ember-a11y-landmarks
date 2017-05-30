import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('a11y-landmark', 'Unit | Component | a11y landmark', {
    unit: true
});

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
    const expectedErrorMessage = 'Set the tagName to form, not the landmarkRole.';

    assert.expectAssertion(() => {
        const component = this.subject({
            landmarkRole: 'form'
        });
        component.get('ariaRole');
    }, expectedErrorMessage);
});

test('it fails to determine ariaRole when tagName is invalid', function(assert) {
    const expectedErrorMessage = 'Invalid tagName "someInvalidTagName". Must be one of aside, footer, form, header, main, nav, div.';

    assert.expectAssertion(() => {
        const component = this.subject({ tagName: 'someInvalidTagName' });
        component.get('ariaRole');
    }, expectedErrorMessage);
});

test('it fails to determine ariaRole when landmarkRole is invalid', function(assert) {
    const expectedErrorMessage = 'Invalid landmarkRole \"someInvalidLandmarkRole\". Must be one of application, banner, complementary, contentinfo, document, main, navigation, region, search.';

    assert.expectAssertion(() => {
        const component = this.subject({ landmarkRole: 'someInvalidLandmarkRole' });
        component.get('ariaRole');
    }, expectedErrorMessage);
});

test('it fails to determine ariaRole when tagName and landmarkRole are both provided', function(assert) {
    const expectedErrorMessage = 'Cannot set both \"tagName\" and \"landMarkRole.\" Use one or the other.';

    assert.expectAssertion(() => {
        const component = this.subject({
            landmarkRole: 'header',
            tagName: 'banner'
        });
        component.get('ariaRole');
    }, expectedErrorMessage);
});

test('it fails to determine ariaRole when neither tagName nor landmarkRole are provided', function(assert) {
    const expectedErrorMessage = 'Must specify either tagName or landmarkRole';

    assert.expectAssertion(() => {
        const component = this.subject();
        component.get('ariaRole');
    }, expectedErrorMessage);
});
