# ember-a11y-landmarks
[![Latest NPM release](https://img.shields.io/npm/v/ember-a11y-landmarks.svg)](https://www.npmjs.com/package/ember-a11y-landmarks)
[![TravisCI Build Status](https://img.shields.io/travis/MelSumner/ember-a11y-landmarks/master.svg?label=TravisCI)](https://travis-ci.org/MelSumner/ember-a11y-landmarks)

Assistive technology (AT) (like screen readers) needs the right HTML semantic elements and/or roles in order to parse the page correctly. This addon helps make it easier for Ember developers by adding the correct role to the HTML element. 

## Installation

```bash
ember install ember-a11y-landmarks
```

## Usage
Since these are higher-order components, you would use them as blocks. Define the `tagName` unless it's a div, then define the `landmarkRole` instead. 
Use the comments in the component as a guide. 

### Template 

#### Example: Header
To use as header element, put this in your template: 
```
{{#a11y-landmark tagName="header"}}
    ...
{{/a11y-landmark}}
```
The element is then a `<header>` and the `role="banner"` is added automatically. 

#### Example: Form/Search
If defining a form, no additional `landmarkRole` is required. However, if the form will be used as a search, then the `landmarkRole` value should be set to `search`. 
Form:
```
{{#a11y-landmark tagName="form"}}
    ...
{{/a11y-landmark}}
```

Search:
```
{{#a11y-landmark tagName="form" landmarkRole="search"}}
    ...
{{/a11y-landmark}}
```

## Contributions
Contributions to this project are encouraged.