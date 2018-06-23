

import Vue from 'vue'
import App from './App'
import router from 'service/router'
import ajax from 'service/ajax'
import config from 'service/config';
import * as filters from 'service/filters.js'
import apis from 'service/apis';
import util from 'service/util';
import '../theme/index.css';
import 'assets/style/main.less';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale';
import {localStore, sessionStore} from 'service/store';
import store from './store';



const lang = localStore.get('language') || config.LANGUAGE;

locale.use(require(`element-ui/lib/locale/lang/${lang}`).default);
Vue.use(ElementUI, {size: 'mini'});

Vue.prototype.$ajax = new ajax();
Vue.prototype.$apis = apis;

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

Object.keys(util).forEach(key => {
  Vue.prototype[key] = util[key];
});

config.LANGUAGE = lang;

// 屏蔽开发环境warn
console.warn = () => {
}


// 去掉console
if (config.ENV_FLAG === 'production') {
  console.log = () => {
  }
}

// underscorejs配置template
_.templateSettings = {
  interpolate: /\{(.+?)\}/g
};


new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
});
