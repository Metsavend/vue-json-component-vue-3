
import './style.scss';

import { App } from "vue";

import JSONView from "./JSONView.vue";

export { JSONView }


export default {
  install: (app) => {
    app.component('JSONView', JSONView);
  }
}