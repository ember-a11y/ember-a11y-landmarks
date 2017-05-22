import Ember from 'ember';
import layout from '../templates/components/a11y-landmark';
import LANDMARK_NAVIGATION_ROLES, { VALID_ROLES } from '../utils/landmark-navigation-roles';
import computed from 'ember-computed';
import get from 'ember-metal/get';

/*
    Component accepts 'tagName' and 'landmarkRole'.

    The tagName is your 'landmark' and can be one of 7 values:
    aside, footer, form, header, main, nav, div (default)

    landmark is validated when computing 'ariaRole' (since tagNames can't be computed properties).

    If the landmark is not a 'div' or a 'form', you will not need to set its landmarkRole -- it will
    just use its only assigned role. 'div' and 'form' have more than one role option so they can be set.

    The role values are:
        * aside (complementary)
        * footer (contentinfo)
        * form (form, search)
        * header (banner)
        * main (main)
        * nav (navigation)
        * div (application, document, region or any of the previous)
*/
export default Ember.Component.extend({
    layout,

    tagName: 'div',

    landmarkRole: computed('tagName', {
        get() {
            const landmark = get(this, 'tagName');

            return LANDMARK_NAVIGATION_ROLES[landmark];
        },
        set(key, value) {
            const landmark = get(this, 'tagName');

            if (!VALID_ROLES.includes(value)) {
                Ember.assert(`Invalid landmarkRole "${value}". Must be one of ${VALID_ROLES.join(', ')}.`);
            }

            if (!(landmark === 'div' || landmark === 'form')) {
                Ember.Logger.warn(`Setting landmarkRole is not required when the landmark is not a div or a form`);
                return LANDMARK_NAVIGATION_ROLES[landmark];
            }


            if (landmark === 'form' && !(value === 'form' || value === 'search')) {
                Ember.assert(`Invalid landmarkRole "${value}". Should be "form" or "search" for a "form" landmark.`);
            }

            return value;
        }
    }),

    /*we should set an aria-role when either a native element is not used, or the native element does not have the body element as its parent.
     * since nothing is going to be the direct child of the body in an Ember app, we don't have to check for that.
     */
    ariaRole: computed('tagName', 'landmarkRole', {
        get() {
            const landmark = get(this, 'tagName');
            const landmarkRole = get(this, 'landmarkRole');
            const validLandmarks = Object.keys(LANDMARK_NAVIGATION_ROLES);

            if (!validLandmarks.includes(landmark)) {
                Ember.assert(`Assertion Failed: Invalid tagName "${landmark}". Must be one of ${validLandmarks.join(', ')}.`);
            }

            if (landmark === 'form' && landmarkRole === 'search') {
                return 'search';
            }

            if (landmark === 'div' && landmarkRole === 'form') {
                Ember.assert('Use a form element for forms.');
                //or search? think about this more in the context of Ember.
            }

            return landmarkRole;
        }
    })
});
