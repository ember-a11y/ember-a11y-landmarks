import Ember from 'ember';
import layout from '../templates/components/a11y-landmark';
import LANDMARK_NAVIGATION_ROLES, { VALID_TAG_NAMES, VALID_LANDMARK_ROLES } from 'ember-a11y-landmarks/utils/landmark-navigation-roles';

/*
    Component accepts 'tagName' or 'landmarkRole'.

    The tagName is your 'landmark' and can be one of 7 values:
    aside, footer, form, header, main, nav, div (default)

    landmark is validated when computing 'ariaRole' (since tagNames can't be computed properties).

    If the landmark is not a 'div' or a 'form', you will not need to set its landmarkRole -- it will
    just use its assigned role. 'div' and 'form' have more than one role option so they should be set.

    The role values are:
        * aside (complementary)
        * footer (contentinfo)
        * header (banner)
        * main (main)
        * nav (navigation)
        * form (form, search)
        * div (application, document, region or any of the previous)
*/
export default Ember.Component.extend({
    layout,
    attributeBindings: ['ariaLabel:aria-label'],

    tagName: null,

    landmarkRole: null,

    /*we should set an aria-role when either a native element is not used, or the native element does not have the body element as its parent.
     * since nothing is going to be the direct child of the body in an Ember app, we don't have to check for that.
     */
    ariaRole: Ember.computed('tagName', 'landmarkRole', function() {
        const landmark = this.get('tagName');
        const landmarkRole = this.get('landmarkRole');

        if (landmark && landmarkRole) {
            if (landmark === 'form' && landmarkRole === 'search') {
                return 'search';
            } else if (landmark != 'form' && landmarkRole === 'search') {
                Ember.assert('This is not a valid combination. Use the form element for a search.');
            } else {
                Ember.assert('Cannot set both "tagName" and "landMarkRole." Use one or the other.');
            }
        } else if (landmarkRole) {
            this._validateLandmarkRole(landmarkRole);
            return landmarkRole;
        } else if (landmark) {
            this._validateTagName(landmark);
            return LANDMARK_NAVIGATION_ROLES[landmark];
        } else {
            Ember.assert('Must specify either tagName or landmarkRole');
        }
    }),

    _validateTagName(tagName) {
        this._validateValueOf('tagName', tagName, VALID_TAG_NAMES);
    },

    _validateLandmarkRole(landmarkRole) {
        if (landmarkRole === 'form') {
            Ember.assert('Set the tagName to form, not the landmarkRole.');
        }

        this._validateValueOf('landmarkRole', landmarkRole, VALID_LANDMARK_ROLES);
    },

    _validateValueOf(type, value, list) {
        if (list.indexOf(value) === -1) {
            const validValues = list.join(', ');
            Ember.assert(`Invalid ${type} "${value}". Must be one of ${validValues}.`);
        }
    },

    // add support for an aria-label, since a landmark element can have one defined.
    ariaLabel: null
});
