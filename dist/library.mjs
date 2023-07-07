import JSONView from '@/JSONView';
import JSONViewItem from '@/JSONViewItem';

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

export { plugin as default };
