/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/routers'

import ElementUI from 'element-ui'
import VueLazyLoad from 'vue-lazyload'
import 'element-ui/lib/theme-chalk/index.css'
// import store from './store'
import axios from 'axios';
import Validator from 'vue-validator';
import constant from '@/assets/js/constant.js';
import rules from '@/assets/js/rules.js';
import serverDataUtil from '@/assets/js/ServerDataUtil.js';
import stringUtils from '@/assets/js/StringUtils.js';
import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import auth from './components/auth/auth';


Vue.use(codemirror)
Vue.use(ElementUI)
Vue.use(VueLazyLoad, { // 全局使用图片懒加载
    loading: 'static/loading-svg/loading-bars.svg',
    try: 1 // default 1
})

//在启动APP时进行校验是否有token
auth.checkAuth()

Vue.prototype.$axios = axios;
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:8080/api'
axios.defaults.root = '/api';


/* eslint-disable no-new */
new Vue({
    el: '#app',
    // store,
    router,
    data: {
        eventHub: new Vue()
    },
    components: {App},
    template: '<App/>'
})

Vue.use(Validator);
Vue.use(constant);
Vue.use(rules);
Vue.use(serverDataUtil);
Vue.use(stringUtils);
