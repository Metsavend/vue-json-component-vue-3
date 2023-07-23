# Vue JSON Component For Vue-3

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Demo](https://www.metsavend.ee/vue3jsonview/) (Like New Version)

I made this [Original package](https://github.com/tylerkrupicka/vue-json-component) to Vue 3 full support.
Now you can use it with vue 3 with no problem. I removed much much useless plugins here what user/client who is using this plugin does not need in their project.

A collapsable tree view for JSON. This package has some similarites with [vue-json-tree-view](https://github.com/michaelfitzhavey/vue-json-tree-view) so I'll address the differences below. I'm not contributing this back to that package because it would require breaking API changes, and the code is entirely different. **Contributions welcome!**

![demo image](https://www.metsavend.ee/vue3jsonview/jsonnew.png)

## Version updates.
- **1.7.4** removed key margin-left and reduced array, object margin to 10px;
- **1.7.5** long words, values now wrap.
- **1.7.6** (23.07.2023)
  1. longlong words what does not have space wraps too.
  2. I add 2 new props [length_of_value, use_ellipsis]. description is below @ props descriptions.
  3. Demo is updated to last 1.7.6 functionalitys.


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
- **customParams (new in 1.7)** (object): Custom strings for item and objetcs. Must be {property: ['objectOne', 'objectMany'], item: ['arrayOne', 'arrayMany']} ;
- **noBorder (new in 1.7)** (Boolean): if items have border or not.
- **length_of_value (new in 1.7.6**) (Number): Length of value to show default. Must set props use_ellipsis to true, do use it. 
- **use_ellipsis (new in 1.7.6**) (Boolean): Enables ellipsis function to hide very long values default.


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

### Filter Item Events

If useFilter is true, then you can use funnel icon to call event on array or object items. It will return full path where this item is located.
In development. If clicked on filter data fill be filtered in selected key.

```js
<JSONView
  :data="data"
  @filter="filterEvent"
/>
```
**Event (filter)**
- key: _string_
- path: _string_
- type: object or array
- reset: boolean
- selected_path: _string_

## Development

1. Trying to make things better and better.
2. Trying to expand filter function to get path elements only.
3. Trying to make all costumize. You can edit all params, like borders, sizes and so on.
4. Trying to make it editable and then save to file if needed.
5. Read file in and save it later.

### exaple with filter (my solution)
```js
  <JSONView 
      :data="data_key_selected ? newdata : data"
      :rootKey="data_key_selected ? data_key_selected : 'data'"
      :selected_dev_row="data_key_selected"
      :useFilter="true"
      @filter="filterfunc($event)"
  />
  const data = reactive({
        'test': [
            { 
                terve: 'te ssd',
                test2 : 'sdasd', 
                number: 23,
                booleant: true,
                booleanf: false,
                undefined: '',
                object: {
                    object2: {
                        number:2222,
                        object3: {
                            number: 223,
                            object4: {
                                array: [1,2,33,4],
                                string: 'test'
                            }
                        }
                    }
                }
            },
            { terve: 'te ssd', },
            { terve: 'te ssd', },
            { terve: 'te ssd', },
            { terve: 'te ssd', },
        ],
        'array_of_string': ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'],
        'array_of_number': [10, 1000, 2334, 4003, 4000 , 8888],
        'array_of_booleans': [true, false, true, true ,true, false, false, false, false],
        'number': 123,
        'string': "This is string"
    })

    const data_key_selected = ref();
    const newdata = ref();

    const filterfunc = param => {
        data_key_selected.value = param.selected_path;
        if (param.reset) {
            data_key_selected.value = ''; 
            return;
        }
        if (!param?.selected_path) return;
        const keys = param.selected_path.split(/\.|\[|\]/g).filter(Boolean); // Split the parameter into individual keys
        keys.shift(); // removes first key use if needed.
        let result = data;
        for (const key of keys) {
            result = result[key];
            if (result === undefined) {
                data_key_selected.value = '';
                return undefined; // Return undefined if the key is not found
            }
        }
        newdata.value = result;
    }
```

## Contributing

Contributions are welcome via pull request. If you want to discuss your feature before committing development time, feel free to open an issue and we can refine the idea.

Thanks!
