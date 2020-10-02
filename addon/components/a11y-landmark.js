import { assert, warn } from '@ember/debug';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/a11y-landmark';

const LANDMARK_NAVIGATION_ROLE = {
    header: 'banner',
    nav: 'navigation',
    aside: 'complementary',
    main: 'main',
    footer: 'contentinfo',
    form: 'form',
    div: 'region'
};

const VALID_LANDMARK_ROLES = [
    'application',
    'banner',
    'complementary',
    'contentinfo',
    'document',
    'main',
    'navigation',
    'region',
    'search'
];

const VALID_TAG_NAMES = [
    'aside',
    'footer',
    'form',
    'header',
    'main',
    'nav',
    'div'
];

export default Component.extend({
    layout,
    attributeBindings: ['ariaLabel:aria-label'],

    /* this should be one of 7 values:
     * aside (complementary)
     * footer (contentinfo)
     * form (form, search)
     * header (banner)
     * main (main)
     * nav (navigation)
     * div (application, document, region or any of the previous)
     */
    tagName: 'div',

    /*should only be set if ('div' or 'form') is being used as a tagName, otherwise we don't need it.
     * valid values:
     * banner
     * navigation
     * aside
     * main
     * form
     * search
     * application
     * document
     * region (default)
     */
    landmarkRole: null,

    /*we should set an aria-role when either a native element is not used, or the native element does not have the body element as its parent.
     * since nothing is going to be the direct child of the body in an Ember app, we don't have to check for that.
     */
    ariaRole: computed('tagName', 'landmarkRole', function() {
        const landmark = this.tagName;
        const landmarkRole = this.landmarkRole;

        if (landmark && landmarkRole) {
            if (landmark === 'form' && landmarkRole === 'search') {
                return 'search';
            } else if (landmark != 'form' && landmarkRole === 'search') {
                assert('This is not a valid combination. Use the form element for a search.');
            } else if (landmark === 'div') {
                this._validateLandmarkRole(landmarkRole);
                return landmarkRole;
            } else {
                assert('Only "div" or "form" can be used with "landMarkRole." Use one or the other.');
            }
        } else if (landmarkRole) {
            this._validateLandmarkRole(landmarkRole);
            return landmarkRole;
        } else if (landmark) {
            this._validateTagName(landmark);
            return LANDMARK_NAVIGATION_ROLE[landmark];
        } else {
            warn('Should specify either tagName or landmarkRole', {
                id: 'ember-a11y.no-tagName-or-landmarkRole'
            });
            return 'region';
        }
      return undefined;
    }),

    _validateTagName(tagName) {
        if (VALID_TAG_NAMES.indexOf(tagName) === -1) {
            const validValues = VALID_TAG_NAMES.join(', ');
            assert(`Invalid tagName "${tagName}". Must be one of ${validValues}.`);
        }
    },

    _validateLandmarkRole(landmarkRole) {
        if (landmarkRole === 'form') {
            assert('Set the tagName to form, not the landmarkRole.');
        }

        if (VALID_LANDMARK_ROLES.indexOf(landmarkRole) === -1) {
            const validValues = VALID_LANDMARK_ROLES.join(', ');
            assert(`Invalid tagName "${landmarkRole}". Must be one of ${validValues}.`);
        }
    },

    // add support for an aria-label, since a landmark element can have one defined.
    ariaLabel: null
});
