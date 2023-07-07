'use strict';

var vue = require('vue');

const _hoisted_1 = { class: "json-view-item" };
const _hoisted_2 = { key: 0 };
const _hoisted_3 = ["onClick", "aria-expanded"];
const _hoisted_4 = { class: "properties" };
const _hoisted_5 = ["role", "tabindex"];
const _hoisted_6 = { class: "value-key" };
const __default__$1 = vue.defineComponent({
name: 'json-view-item',
});

var script$1 = /*#__PURE__*/Object.assign(__default__$1, {
  props: {
data: {
    required: true,
    type: Object,
},
maxDepth: {
    type: Number,
    required: false,
    default: 1,
},
canSelect: {
    type: Boolean,
    required: false,
    default: false,
},
},
  emits: ['selected'],
  setup(__props, { emit }) {

const props = __props;




const open = vue.ref<boolean>(props.data.depth < props.maxDepth);

const toggleOpen = () => {
open.value = !open.value;
};

const clickEvent = (data) => {
emit('selected', {
    key: data.key,
    value: data.value,
    path: data.path,
});
};

const bubbleSelected = (data) => {
emit('selected', data);
};

const getKey = (value) => {
if (!isNaN(value.key)) {
    return value.key + ':';
} else {
    return '"' + value.key + '":';
}
};

const getValueStyle = (value) => {
const type = typeof value;
switch (type) {
    case 'string':
    return { color: 'var(--vjc-string-color)' };
    case 'number':
    return { color: 'var(--vjc-number-color)' };
    case 'boolean':
    return { color: 'var(--vjc-boolean-color)' };
    case 'object':
    return { color: 'var(--vjc-null-color)' };
    case 'undefined':
    return { color: 'var(--vjc-null-color)' };
    default:
    return { color: 'var(--vjc-valueKey-color)' };
}
};

//computed functions

const classes = vue.computed(() => {
return {
    'chevron-arrow': true,
    opened: open.value,
};
});

const valueClasses = vue.computed(() => {
return {
    'value-key': true,
    'can-select': props.canSelect,
};
});

const lengthString = vue.computed(() => {
if (props.data.type === 'array') {
    return props.data.length === 1
    ? props.data.length + ' element'
    : props.data.length + ' elements';
}
return props.data.length === 1
    ? props.data.length + ' property'
    : props.data.length + ' properties';
});

const dataValue = vue.computed(() => {
if (typeof props.data.value === 'undefined') {
    return 'undefined';
}
return JSON.stringify(props.data.value);
});

return (_ctx, _cache) => {
  const _component_json_view_item = vue.resolveComponent("json-view-item");

  return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
    vue.createCommentVNode(" Handle Objects and Arrays"),
    (__props.data.type === 'object' || __props.data.type === 'array')
      ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
          vue.createElementVNode("button", {
            onClick: vue.withModifiers(toggleOpen, ["stop"]),
            class: "data-key",
            "aria-expanded": open ? 'true' : 'false'
          }, [
            vue.createElementVNode("div", {
              class: vue.normalizeClass(classes.value)
            }, null, 2 /* CLASS */),
            vue.createTextVNode(" " + vue.toDisplayString(__props.data.key) + ": ", 1 /* TEXT */),
            vue.createElementVNode("span", _hoisted_4, vue.toDisplayString(lengthString.value), 1 /* TEXT */)
          ], 8 /* PROPS */, _hoisted_3),
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.data.children, (child) => {
            return vue.withDirectives((vue.openBlock(), vue.createBlock(_component_json_view_item, {
              onSelected: bubbleSelected,
              key: getKey(child),
              data: child,
              maxDepth: __props.maxDepth,
              canSelect: __props.canSelect
            }, null, 8 /* PROPS */, ["data", "maxDepth", "canSelect"])), [
              [vue.vShow, open]
            ])
          }), 128 /* KEYED_FRAGMENT */))
        ]))
      : vue.createCommentVNode("v-if", true),
    vue.createCommentVNode(" Handle Leaf Values "),
    (__props.data.type === 'value')
      ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 1,
          class: vue.normalizeClass(valueClasses.value),
          onClick: _cache[0] || (_cache[0] = $event => (clickEvent(__props.data))),
          onKeyup: [
            _cache[1] || (_cache[1] = vue.withKeys($event => (clickEvent(__props.data)), ["enter"])),
            _cache[2] || (_cache[2] = vue.withKeys($event => (clickEvent(__props.data)), ["space"]))
          ],
          role: __props.canSelect ? 'button' : undefined,
          tabindex: __props.canSelect ? '0' : undefined
        }, [
          vue.createElementVNode("span", _hoisted_6, vue.toDisplayString(__props.data.key) + ":", 1 /* TEXT */),
          vue.createElementVNode("span", {
            style: vue.normalizeStyle(getValueStyle(__props.data.value))
          }, vue.toDisplayString(dataValue.value), 5 /* TEXT, STYLE */)
        ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, _hoisted_5))
      : vue.createCommentVNode("v-if", true)
  ]))
}
}

});

script$1.__scopeId = "data-v-0003b0b9";
script$1.__file = "src/JSONViewItem.vue";

const __default__ = vue.defineComponent({
        name: 'json-view',
    });

var script = /*#__PURE__*/Object.assign(__default__, {
  props: {
    data: {
        required: true,
    },
    rootKey: {
        type: String,
        required: false,
        default: 'root',
    },
    maxDepth: {
        type: Number,
        required: false,
        default: 1,
    },
    colorScheme: {
        type: String,
        required: false,
        default: 'light',
    },
},
  emits: ['selected'],
  setup(__props, { emit }) {

const props = __props;





const build = (
    key,
    val,
    depth,
    path,
    includeKey
) => {
    if (isObject(val)) {
      // Build Object
        let children = [];
        for (let [childKey, childValue] of Object.entries(val)) {
            children.push(
            build(
                childKey,
                childValue,
                depth + 1,
                includeKey ? `${path}${key}.` : `${path}`,
                true
            )
            );
        }
        return {
            key: key,
            type: 'object',
            depth: depth,
            path: path,
            length: children.length,
            children: children,
        };
    } else if (isArray(val)) {
      // Build Array
        let children = [];
        for (let i = 0; i < val.length; i++) {
            children.push(
            build(
                i.toString(),
                val[i],
                depth + 1,
                includeKey ? `${path}${key}[${i}].` : `${path}`,
                false
            )
            );
        }
        return {
            key: key,
            type: 'array',
            depth: depth,
            path: path,
            length: children.length,
            children: children,
        };
    } else {
      // Build Value
        return {
            key: key,
            type: 'value',
            path: includeKey ? path + key : path.slice(0, -1),
            depth: depth,
            value: val,
        };
    }
};

const isObject = val => {
return typeof val === 'object' && val !== null && !isArray(val);
};

const isArray = val => {
    return Array.isArray(val);
};

const itemSelected = data => {
    emit('selected', data);
};

  //computed functions

const parsed = vue.computed(() => {
    if (typeof props.data === 'object') {
        return build(props.rootKey, { ...props.data }, 0, '', true);
    }
    return {
        key: props.rootKey,
        type: 'value',
        path: '',
        depth: 0,
        value: props.data,
    };
});


return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createBlock(script$1, {
    class: vue.normalizeClass([{ 'root-item': true, dark: __props.colorScheme === 'dark' }]),
    data: parsed.value,
    maxDepth: __props.maxDepth,
    onSelected: itemSelected
  }, null, 8 /* PROPS */, ["class", "data", "maxDepth"]))
}
}

});

script.__scopeId = "data-v-438efa06";
script.__file = "src/JSONView.vue";

exports.JSONView = script;
