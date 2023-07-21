<template>
    <JSONViewItem
        :class="[{ 'root-item': true, dark: colorScheme === 'dark' }]"
        :data="parsed"
        :maxDepth="maxDepth"
        :firstKey="true"
        :selected_dev_row="selected_dev_row"
        :arrowExpand="arrowExpand"
        :arrowCollapse="arrowCollapse"
        :useFilter="useFilter" 
        :customParams="customParams"
        :noBorder="noBorder"
        @selected="itemSelected"
        @filter="$emit('filter', $event);"
    />
</template>

<script>
    import { computed, defineComponent, ref } from 'vue';
      export default defineComponent({
        name: 'json-view',
      });
</script>
<script setup>
import JSONViewItem from './JSONViewItem.vue';

const props = defineProps({
    data: {
        required: true,
    },
    rootKey: {
        type: String,
        required: false,
        default: 'root',
    },
    selected_dev_row: {
        required: false,
        default:'',
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
    customParams: {
        type: Object,
        required: false,
        default: () => {},
    },
    useFilter: {
        type: Boolean, 
        required: false,
        default: false
    },
    noBorder: {
        type: Boolean, 
        required: false,
        default: false
    },
    arrowExpand: {
        type: [String, Number], 
        required: false,
        default: ''
    },
    arrowCollapse: {
        type: [String, Number], 
        required: false,
        default: ''
    }
});

const emit = defineEmits(['selected', 'filter', 'filteredDataPath']);

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

const parsed = computed(() => {
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

const filteredDataPath = ref();
const consoles = ref();
</script>
<style>
.root-item {
    --vjc-key-color: #0977e6;
    --vjc-valueKey-color: #073642;
    --vjc-string-color: #268bd2;
    --vjc-number-color: #2aa198;
    --vjc-boolean-color-false: #cb4b16;
    --vjc-boolean-color-true: green;
    --vjc-null-color: #6c71c4;
    --vjc-arrow-size: 6px;
    --vjc-arrow-color: #444;
    --vjc-hover-color: rgba(0, 0, 0, 0.2);
    margin-left: 0;
    width: 100%;
    height: auto;
  }
  .root-item.dark {
    --vjc-key-color: #80d8ff;
    --vjc-valueKey-color: #fdf6e3;
    --vjc-hover-color: rgba(255, 255, 255, 0.2);
    --vjc-arrow-color: #fdf6e3;
  }
  .json-view-item:not(.root-item) {
    margin-left: 10px;
  }
  .json-view-item {
      border-bottom: 1px dashed #999;
      margin-bottom: -2px;
  }
  .json-view-item:last-child {
    border-bottom: none;
  }
  .value-key {
    color: var(--vjc-valueKey-color);
    font-weight: 600;
    font-size: inherit;
    margin-left: 0;
    border-radius: 2px;
    white-space: nowrap;
    padding: 5px 5px 5px 10px;
  }
  .value-key.can-select {
    cursor: pointer;
  }
  .value-key.can-select:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
  .value-key.can-select:focus {
    outline: 2px solid var(--vjc-hover-color);
  }
  .data-key {
    font-size: inherit;
    font-family: inherit;
    border: 0;
    background-color: transparent;
    color: var(--vjc-key-color);
    display: inline-block;
    align-items: center;
    border-radius: 2px;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    padding: 5px;
  }
  .data-key:hover {
    background-color: var(--vjc-hover-color);
  }
  .data-key:focus {
    outline: 2px solid var(--vjc-hover-color);
  }
  .data-key::-moz-focus-inner {
    border: 0;
  }
  .data-key .properties {
    font-weight: 300;
    opacity: 0.9;
    margin-left: 4px;
    user-select: none;
  }
  .chevron-arrow {
    flex-shrink: 0;
    border-right: 4px solid var(--vjc-arrow-color);
    border-bottom: 4px solid var(--vjc-arrow-color);
    width: var(--vjc-arrow-size);
    height: var(--vjc-arrow-size);
    margin-right: 20px;
    margin-left: 5px;
    transform: rotate(-45deg);
  }
  .chevron-arrow.opened {
    margin-top: -3px;
    transform: rotate(45deg);
  }

</style>