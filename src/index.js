"use strict";
import JSONView from './components/JSONView.vue';

export default {
    install: (app, options) => {
        app.component('JSONView', JSONView);
    }
};