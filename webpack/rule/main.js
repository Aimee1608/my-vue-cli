import Vue from "vue";
// import VConsole from "vconsole";
import ControlWrap from './src/controls/ControlWrap';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from "./src/rule.vue";
Vue.use(ElementUI)

Vue.component('ControlWrap', ControlWrap)
// new VConsole();
new Vue({
  el: "#app",
  render: (h) => h(App),
});
