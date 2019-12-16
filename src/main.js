import Vue from "vue";

import "normalize.css/normalize.css";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueUeditorWrap from "vue-ueditor-wrap";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "./axios";
import api from "./axios/httpApi";
import globalVariable from "./axios/global_variable";
import qs from "qs";
import "./registerServiceWorker";
import "./styles/global.less";
import "./permission";
import globalFunctions from "./utils/globalFunctions";
import globalMethods from "./utils/projectCommonMethods";
import * as filters from "./utils/filters";
Vue.config.productionTip = false;

Vue.prototype.$http = axios;
Vue.prototype.$api = api;
Vue.prototype.$global = globalVariable;
Vue.prototype.$globalFnc = globalFunctions;

Vue.use(ElementUI);
Vue.prototype.$qs = qs;
Vue.component("vue-ueditor-wrap", VueUeditorWrap);
Vue.use(globalMethods);

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));
document.title = "vue项目demo";

//自定义一个代码高亮指令
Vue.directive("highlight", function(el) {
  let highlight = el.querySelectorAll("pre code");
  highlight.forEach(block => {
    hljs.highlightBlock(block);
  });
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
