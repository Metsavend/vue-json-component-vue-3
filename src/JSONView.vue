<template>
    <JSONViewItem
        :class="[{ 'root-item': true, dark: colorScheme === 'dark' }]"
        :data="parsed"
        :maxDepth="maxDepth"
        @selected="itemSelected"
    />
</template>

<script>
    import { computed, defineComponent } from 'vue';
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
});

const emit = defineEmits(['selected']);

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

</script>