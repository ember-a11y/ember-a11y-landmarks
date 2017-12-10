# ember-a11y-landmarks
[![Latest NPM release](https://img.shields.io/npm/v/ember-a11y-landmarks.svg)](https://www.npmjs.com/package/ember-a11y-landmarks)
[![TravisCI Build Status](https://img.shields.io/travis/ember-a11y/ember-a11y-landmarks/master.svg?label=TravisCI)](https://travis-ci.org/ember-a11y/ember-a11y-landmarks)

The `ember-a11y-landmarks` addon helps you assign the `role` attribute that should go on landmark tags like `<header>` and `<nav>`, without needing to learn the intricacies of when to add roles or what they should be. A landmark is a special kind of semantic HTML tag that Assistive technology(AT) uses to parse a page correctly.

When is this addon needed? In a typical Ember app, almost everything gets wrapped in a `<div>`, but this can be confusing to tools like screen readers. The Assistive Technology expects that either landmark elements are direct descendants of the `<body>` element or that they have a particular `role` attribute. `ember-a11y-landmarks` handles this problem for you.

## How this addon works
This addon helps add the correct roles to the following elements:

| tagName | role |
| ---- | --- |
| header | banner |
| nav | navigation |
| aside | complementary |
| main | main |
| form | form |
| footer | contentinfo |

While semantic landmark tags are best for accessibility, some developers may be faced with working on an app that uses `div` tags instead. For those cases, this addon provides a way to add roles to a `div` element until they can be refactored (see [Div Usage](#div-usage)).

## Installation

```bash
ember install ember-a11y-landmarks
```

## Landmark Tag Usage

This addon is used like a block component. Just set the `tagName` attribute to `header`, `nav`, `aside`, `main`, `form`, or `footer`, and put your content inside the block. For example, here's a header:

```
{{#a11y-landmark tagName="header"}}
    This is my header content
{{/a11y-landmark}}
```

The resulting markup in the DOM will have the correct tag type and the role that should be used for that tag:

```
<header id="ember337" role="banner" class="ember-view">
    This is my header content
</header>
```

## Div Usage

If a developer must use a div instead of a semantic tag like `<header>`, define `landmarkRole` instead of `tagname`. You can look up the correct landmark role in the  [How this addon works](#how-this-addon-works) table. Here's a header example:

```
{{#a11y-landmark landmarkRole="banner"}}
    This is my header content (that should be refactored later to go inside a real header tag)
{{/a11y-landmark}}
```

In the DOM markup, this will result in a `div` with the specified `role`:

 ```
<div id="ember337" role="banner" class="ember-view">
      This is my header content (that should be refactored later to go inside a real header tag)
</div>
 ```

## Form/Search Usage

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
