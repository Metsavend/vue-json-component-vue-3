
import './style.scss';

import JSONView from "./JSONView.vue";

export { JSONView }


export default {
  install: (app) => {
    app.component('JSONView', JSONView);
  }
}