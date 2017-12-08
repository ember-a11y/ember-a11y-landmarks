# ember-a11y-landmarks
[![Latest NPM release](https://img.shields.io/npm/v/ember-a11y-landmarks.svg)](https://www.npmjs.com/package/ember-a11y-landmarks)
[![TravisCI Build Status](https://img.shields.io/travis/ember-a11y/ember-a11y-landmarks/master.svg?label=TravisCI)](https://travis-ci.org/ember-a11y/ember-a11y-landmarks)

## Context
Assistive technology(AT) requires the correct HTML semantic elements and/or roles to be used, in order to parse the page correctly. If the "landmark" elements are the direct descendant of the `body` element, then the role declaration is not needed. However, since Ember wraps each app in a div, and that div is the direct descendant of the `body` element, role declaration on these elements are required. 

## How this addon works
Certain roles need to be added to specific HTML elements, but only when those elements are not the direct descendant of the `body` element. This addon automatically adds the correct roles to the following elements: 

- header | role="banner"
- nav | role="navigation"
- aside | role="complementary"
- main | role="main"
- form | role="form"
- footer | role="contentinfo"

Additionally, you could add any of the roles to a `div` element instead (see Usage).

## Installation

```bash
ember install ember-a11y-landmarks
```

## Usage
- Use these like blocks.
- Define the `tagName` unless it's a div, then define the `landmarkRole` instead. 
- Use the comments in the component as a guide. 

### Template 

#### Example: Header
To use as header element, put this in your template: 
```hbs
{{#a11y-landmark tagName="header"}}
    ...
{{/a11y-landmark}}
```
The element is then a `<header>` and the `role="banner"` is added automatically. 

#### Example: Form/Search
If defining a form, no additional `landmarkRole` is required. However, if the form will be used as a search, then the `landmarkRole` value should be set to `search`. 

Form:
```hbs
{{#a11y-landmark tagName="form"}}
    ...
{{/a11y-landmark}}
```

Search:
```hbs
{{#a11y-landmark tagName="form" landmarkRole="search"}}
    ...
{{/a11y-landmark}}
```

## Contributions
Contributions to this project are encouraged.
