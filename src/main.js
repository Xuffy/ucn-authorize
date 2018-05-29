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
import VueI18n from 'vue-i18n'
import lang from 'lib/lang'
import ElementUI from 'element-ui';
import store from './store';
import {addCookie, getCookie, delCookie} from 'service/cookie.js';

// import { Message } from 'element-ui';
// Vue.prototype.$message = Message;

Vue.prototype.$cookieStore = {
  addCookie,
  getCookie,
  delCookie
}

// Vue.use(api);
Vue.use(util);
Vue.use(VueI18n);
Vue.use(ElementUI, {size: 'small',i18n: (key, value) => i18n.t(key, value)});

Vue.prototype.$ajax = new ajax();
Vue.prototype.$apis = apis;

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});


const i18n = new VueI18n({
  locale: 'zhCN',
  // locale: Vue.prototype.$sessionStore.get('language') || 'en',
  messages: lang
});

// console.log(lang['en'])

new Vue({
  el: '#app',
  store,
  router,
  i18n,
  template: '<App/>',
  components: {App}
});
