import { createApp } from "vue";
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
const app = createApp(App);;

app.config.warnHandler = (err, vm, info) => {
    console.groupCollapsed(`%c Vue warning: ${(err.length > 70 ? err.slice(0, 70)+'...' : err)}`, 'color:gold');
    console.warn(`%c ${err}`, 'color:gold');

    if (vm) {
        console.groupCollapsed('%c Vue component', 'color:pink');
        console.log(vm);
        console.groupEnd();
    }

    if (info) {
        console.groupCollapsed('%c Found_in', 'color:orange');
        console.log('%c'+info.slice(17), 'color:orange;');
        console.groupEnd();
    }

    console.groupEnd();
};

app.config.errorHandler = (err, vm, info) => {
    console.groupCollapsed(`%c Vue error: ${err}`, 'color:#FF8080;');
    console.error(err);
    if (vm) {
        console.groupCollapsed('%c Vue component', 'color:pink');
        console.log(vm);
        console.groupEnd();
    }

    if (info) {
        console.groupCollapsed('%c Info', 'color:orange');
        console.log('%c'+info, 'color:orange;');
        console.groupEnd();
    }
    console.groupEnd();
};

app.mount("#app");