import Ember from 'ember';
import layout from '../templates/components/a11y-landmark';

const LANDMARK_NAVIGATION_ROLE = {
    _default: 'region',
    header: 'banner',
    nav: 'navigation',
    aside: 'complementary',
    main: 'main',
    footer: 'contentinfo',
    form: 'form',
    div: 'div'
};

export default Ember.Component.extend({
    layout,

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
    landmarkRole: 'region',

    /*we should set an aria-role when either a native element is not used, or the native element does not have the body element as its parent. 
     * since nothing is going to be the direct child of the body in an Ember app, we don't have to check for that. 
     */
    ariaRole: Ember.computed('tagName', 'landmarkRole', function() {
        const landmark = this.get('tagName');
        let landmarkRole = this.get('landmarkRole');
        if (landmark === 'form' && landmarkRole === 'search') {
            return 'search';
        } else if (landmark === 'div') {
            if (landmarkRole === 'form') {
                Ember.assert('Use a form element for forms.');
                //or search? think about this more in the context of Ember. 
            } else {
                return (landmarkRole);
            }
        } else {
            return LANDMARK_NAVIGATION_ROLE[landmark] || LANDMARK_NAVIGATION_ROLE._default;
        }
    }),


});