# Vue JSON Component

[![npm version](https://badge.fury.io/js/vue-json-component.svg)](https://badge.fury.io/js/vue-json-component) ![npm bundle size](https://img.shields.io/bundlephobia/min/vue-json-component.svg) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Demo](http://tylerkrupicka.com/vue-json-component/)

I made this [Original package](https://github.com/tylerkrupicka/vue-json-component) to Vue 3 full support.
Now you can use it with vue 3 with no problem. I removed much much useless plugins here what user/client who is using this plugin does not need in their project.

A collapsable tree view for JSON. This package has some similarites with [vue-json-tree-view](https://github.com/michaelfitzhavey/vue-json-tree-view) so I'll address the differences below. I'm not contributing this back to that package because it would require breaking API changes, and the code is entirely different. **Contributions welcome!**

![demo image](https://user-images.githubusercontent.com/5761061/55198958-7fa16400-518e-11e9-8448-7cd028007920.png)

## Philosophy

I found that json plugin, but it was not workign on vue 3. I am full time developer in Vue 3 now and wanted to make it work on vue 3 also. Found before that original json plugin was very nice and easy to use.
I made some adjustment too but basicly all are same like before.
Added custom icons via svg.

## Usage

### Install

```bash
npm i vue-json-component-vue-3
yarn add vue-json-component-vue-3
```

### Import Locally

```js 
import { JSONView } from "vue-json-component-vue-3";
import "vue-json-component-vue-3/dist/style.css";

```

### Import Globally

```js
import JSONView from 'vue-json-component-vue-3';
import "vue-json-component-vue-3/dist/style.css";
app.use(JSONView);
```

### Use

```js
<template>
  <JSONView :data="data" />
</template>

```

### Customize

The font size and font family are inherited from the page. The component now supports dark mode, and has switched to a CSS Variables based implementation.

#### Props

- **data** (JSON): The valid JSON object you want rendered as a tree.
- **rootKey** (String): The name of the top level root key; defaults to root.
- **maxDepth** (Number): Depth of the tree that is open at first render; defaults to 1.
- **colorScheme** (String): Setting to 'dark' enables dark mode.
- **useFilter (new in vue 3 version)** (Boolean): It enables filter function. Bassicly you can click on funnel icon to key path in array or object.
- **arrowExpand (new in vue 3 version)** (String,Number): Custom image from svg. Full svg requiered. NB! exaple below;
- **arrowCollapse (new in vue 3 version)** (String,Number): Custom image from svg. Full svg requiered. NB! exaple below;

#### Styles

⚠️ This API has changed to CSS Variables. All of these can be customized for light _and_ dark mode as is documented below.

```css
--vjc-key-color: #0977e6;
--vjc-valueKey-color: #073642;
--vjc-string-color: #268bd2;
--vjc-number-color: #2aa198;
--vjc-boolean-color: #cb4b16;
--vjc-null-color: #6c71c4;
--vjc-arrow-size: 6px; // removed at the moment
--vjc-arrow-color: #444; // removed at the moment
--vjc-hover-color: rgba(0, 0, 0, 0.15);
```

### Example

```js
<template>
  <JSONView
    :data="data"
    rootKey="view"
    :maxDepth="1"
    class="customize"
  />
</template>

<style lang="scss" scoped>
.customize {
  --vjc-valueKey-color: green;
}
.customize.dark {
  --vjc-valueKey-color: red;
}
</style>
```

Note: your styles will need to be scoped to override the scoped CSS Variables in the component.

### Selected Item Events

You can allow users to click elements, and receive an event when this occurs. The `selected` event will pass you the key, value, and path of the selected value. If you do not listen for the event, the styles will not indicate that values are clickable.

```js
<JSONView
  :data="data"
  @selected="itemSelected"
/>
```
**Event (selected)**
- key: _string_
- value: _string_
- path: _string_
```

### Filter Item Events

If useFilter is true, then you can use funnel icon to call event on array or object items. It will return full path where this item is located.
In development. If clicked on filter data fill be filtered in selected key.

```js
<JSONView
  :data="data"
  @filter="filterEvent"
/>
```
**Event (selected)**
- key: _string_
- value: _string_
- path: _string_
- type: object or array,
- selected_path: _string_
```

## Development

1. Trying to make things better and better.
2. Trying to expand filter function to get path elements only.
3. Trying to make all costumize. You can edit all params, like borders, sizes and so on.

### Install

```bash
npm
```

## Contributing

Contributions are welcome via pull request. If you want to discuss your feature before committing development time, feel free to open an issue and we can refine the idea.

Thanks!
