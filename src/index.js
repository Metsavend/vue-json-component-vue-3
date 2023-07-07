
import JSONView from "./components/JSONView.vue";
import './style.scss';

export default {
  install: (app, options) => {
    app.component('JSONView', JSONView);
  }
}