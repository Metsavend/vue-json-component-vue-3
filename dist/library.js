'use strict';

var JSONView = require('@/JSONView');
var JSONViewItem = require('@/JSONViewItem');

var components = { JSONView, JSONViewItem};

const plugin = {
  install (Vue) {
    for (const prop in components) {
      if (components.hasOwnProperty(prop)) {
        const component = components[prop];
        Vue.component(component.name, component);
      }
    }
  }
};

module.exports = plugin;
