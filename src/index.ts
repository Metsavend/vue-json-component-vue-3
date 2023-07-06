import JSONView from './JSONView.vue';

export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  install(app: any, options: any) {
    app.component('json-view', JSONView);
  },
};

export { JSONView };
