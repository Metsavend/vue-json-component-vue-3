<template>
  <div id="app">
    <div :class="{ tree: true, dark: dark }">
      <JSONView
        :data="data"
        rootKey="view"
        :maxDepth="1"
        :styles="{ key: '#0977e6' }"
        :colorScheme="colorScheme"
        @selected="itemSelected"
      ></JSONView>
      <JSONView
        rootKey="string"
        data="Not an object"
        :colorScheme="colorScheme"
      />
      <JSONView
        rootKey="customization"
        data="Using CSS Variables"
        class="customize"
        :colorScheme="colorScheme"
      />
    </div>

    <button id="darkButton" @click="toggleDark">Toggle Dark Mode</button>
    <h5>Events</h5>
    <div v-for="(event, index) in events" :key="index">{{ event }}</div>
  </div>
</template>

<script setup lang="ts">
import JSONView from '../src/JSONView.vue';
import { ref, computed } from 'vue';

const events = ref<Array<String>>([]);
const dark = ref<boolean>(false);

const itemSelected = (data: any): void => {
  events.value.push(`Selected: ${data.path} with value ${data.value}`);
};

const toggleDark = (): void => {
  dark.value = !dark.value;
};

// computed func
const data = computed(() => {
  const test = {
    first: 'level',
    works: true,
    number: 100,
    missing: null,
    undefined: undefined,
    list: [
      'fun',
      {
        test: {
          passed: true,
        },
      },
    ],
    object: {
      working: 'properly',
    },
  };
  return test;
});

const colorScheme = computed((): string => {
  return dark.value ? 'dark' : 'light';
});
</script>

<style lang="scss">
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 20px;
  padding: 20px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

#darkButton {
  margin-top: 20px;
  width: 150px;
  height: 30px;
  cursor: pointer;
}

.tree {
  padding: 5px;
}

.tree.dark {
  background-color: #121212;
  border-radius: 4px;
}
</style>

<style lang="scss" scoped>
.customize {
  --vjc-valueKey-color: green;
}
.customize.dark {
  --vjc-valueKey-color: red;
}
</style>
