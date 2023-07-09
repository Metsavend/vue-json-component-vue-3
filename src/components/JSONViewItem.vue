<template>
    <div class="json-view-item">
        <!-- Handle Objects and Arrays-->
        
        <div v-if="data.type === 'object' || data.type === 'array'">
            <div>
                <span
                    :aria-expanded="open ? 'true' : 'false'"
                    class="data-key me-3"
                    @click.stop="toggleOpen"
                >
                    <span v-if="!arrowExpand">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="var(--vjc-key-color)" viewBox="0 0 256 256" v-if="!open">
                            <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"></path><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm45.66-93.66a8,8,0,0,1,0,11.32l-32,32a8,8,0,0,1-11.32-11.32L148.69,136H88a8,8,0,0,1,0-16h60.69l-18.35-18.34a8,8,0,0,1,11.32-11.32Z"></path>
                        </svg>
                    </span>
                    <span v-else>
                        <span v-html="arrowExpand" v-if="!open"/>
                    </span>
                    <span v-if="!arrowCollapse">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="var(--vjc-key-color)" viewBox="0 0 256 256" v-if="open">
                            <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"></path><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm37.66-85.66a8,8,0,0,1,0,11.32l-32,32a8,8,0,0,1-11.32,0l-32-32a8,8,0,0,1,11.32-11.32L120,148.69V88a8,8,0,0,1,16,0v60.69l18.34-18.35A8,8,0,0,1,165.66,130.34Z"></path>
                        </svg>
                    </span>
                    <span v-else>
                        <span v-html="arrowCollapse" v-if="open" />
                    </span>
                    {{ data.key }}:
                    <span class="properties">{{ lengthString }}</span>
                </span> 
                <span class="hover"  @click="clickEventFilter(data)" v-if="!firstKey && useFilter"> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="var(--vjc-key-color)" viewBox="0 0 256 256">
                        <path d="M221.9,61.38l-67.74,72.31a8,8,0,0,0-2.16,5.47v55.49a8,8,0,0,1-3.56,6.66l-32,21.33A8,8,0,0,1,104,216V139.16a8,8,0,0,0-2.16-5.47L34.1,61.38A8,8,0,0,1,40,48H216A8,8,0,0,1,221.9,61.38Z" opacity="0.2"></path>
                        <path d="M230.6,49.53A15.81,15.81,0,0,0,216,40H40A16,16,0,0,0,28.19,66.76l.08.09L96,139.17V216a16,16,0,0,0,24.87,13.32l32-21.34A16,16,0,0,0,160,194.66V139.17l67.74-72.32.08-.09A15.8,15.8,0,0,0,230.6,49.53ZM40,56h0Zm108.34,72.28A15.92,15.92,0,0,0,144,139.17v55.49L112,216V139.17a15.92,15.92,0,0,0-4.32-10.94L40,56H216Z"></path>
                    </svg>      
                </span>
                <span class="hover"  @click="clickEventFilter(data)" v-else-if="firstKey && selected_dev_row && useFilter">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="darkred" viewBox="0 0 256 256">
                        <path d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z" opacity="0.2"></path>
                        <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                    </svg>
                </span>
            </div>
            <json-view-item
                v-for="child in data.children"
                :key="getKey(child)"
                :data="child"
                v-show="open"
                :maxDepth="maxDepth"
                :canSelect="canSelect"
                :firstKey="false"
                :arrowExpand="arrowExpand"
                :arrowCollapse="arrowCollapse"
                :useFilter="useFilter"
                @filter="$emit('filter', $event)"
                @selected="bubbleSelected"
            />
            </div>
            <!-- Handle Leaf Values -->
            <div
                v-if="data.type === 'value'"
                :class="valueClasses"
                @click="clickEvent(data)"
                @keyup.enter="clickEvent(data)"
                @keyup.space="clickEvent(data)"
                :role="canSelect ? 'button' : undefined"
                :tabindex="canSelect ? '0' : undefined"
            >
            <span class="value-key">{{ data.key }}:</span>
            <span :style="getValueStyle(data.value)">
                {{ dataValue }}
            </span>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref, computed } from 'vue';
export default defineComponent({
name: 'json-view-item',
});
</script>
<script setup>
const emit = defineEmits(['selected', 'filter']);
const props = defineProps({
data: {
    required: true,
    type: Object,
},
selected_dev_row: {
    required: false,
    default:'',
    type: String,
},
maxDepth: {
    type: Number,
    required: false,
    default: 1,
},
firstKey: {
    type: Boolean,
    required: false,
    default: true
},
canSelect: {
    type: Boolean,
    required: false,
    default: false,
},
useFilter: {
    type: Boolean,
    required: false,
    default: false,
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

const open = ref(props.data.depth < props.maxDepth);

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

const clickEventFilter = data => {
    emit('filter', {
        key: data.key,
        value: data.value,
        type: data.type,
        path: data.path,
        selected_path: `${data.path}${data.key}`
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

const classes = computed(() => {
return {
    'chevron-arrow': true,
    opened: open.value,
};
});

const valueClasses = computed(() => {
return {
    'value-key': true,
    'can-select': props.canSelect,
};
});

const lengthString = computed(() => {
if (props.data.type === 'array') {
    return props.data.length === 1
    ? props.data.length + ' element'
    : props.data.length + ' elements';
}
return props.data.length === 1
    ? props.data.length + ' property'
    : props.data.length + ' properties';
});

const dataValue = computed(() => {
if (typeof props.data.value === 'undefined') {
    return 'undefined';
}
return JSON.stringify(props.data.value);
});
</script>
<style>
.hover{
    opacity:1.0;
}
.hover:hover {
    opacity:0.6;
    cursor: pointer;
}
</style>