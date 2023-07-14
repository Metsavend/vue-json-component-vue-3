<template>
    <div id="app" class="p-1" :class="dark ? 'bg-dark' : 'bg-light'"
    style="max-width: 800px; width: 100%;"
    >
    <JSONView 
        :data="data_key_selected ? newdata : data"
        :rootKey="data_key_selected ? data_key_selected : 'data'"
        :selected_dev_row="data_key_selected"
        :useFilter="true"
        :noBorder="noBorder"
        :colorScheme="dark ? 'dark' : 'light'"
        :customParams="{property: objekt, item: array}"
        @filter="filterfunc($event)"
    />
    </div>
    <div class="p-1 mt-4">
        <button class="btn btn-outline-primary mt-1" @click="noBorder = !noBorder">Toggle bottom border</button><br/>
        <button class="btn btn-outline-success mt-1" @click="dark = !dark">Toggle dark mode</button><br/>
        <br/><br/>
        Custom objekt or item names after length.<br/>
        <div style="width: 300px" class="mt-1">
            <div class="form-floating mb-3">
                <input type="text" class="form-control" v-model="array[0]" placeholder="">
                <label for="floatingInput">item</label>
            </div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" v-model="array[1]" placeholder="">
                <label for="floatingInput">items</label>
            </div>
            <div class="form-floating mb-3 ">
                <input type="text" class="form-control" v-model="objekt[0]" placeholder="">
                <label for="floatingInput">Object</label>
            </div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" v-model="objekt[1]" placeholder="">
                <label for="floatingInput">Objects</label>
            </div>
        </div>
        <div style="margin-top: 3em;" v-if="data_key_selected">
            Selected path: {{ data_key_selected }}
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

// import JSONView from "../src/components/JSONView";

import { JSONView } from "vue-json-component-vue-3";
import "vue-json-component-vue-3/dist/style.css";

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
const noBorder = ref(false);
const dark = ref(false);
const array = ref(['massiiv','massiivi']);
const objekt = ref(['objekt', 'objekti']);

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
</script>
<style>
#app {
    height: 100%;
}
</style>