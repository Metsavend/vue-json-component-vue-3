import JSONView from './JSONView.vue';

export default {
  install(app: any) {
    app.component('json-view', JSONView);
  },
};

export { JSONView };
