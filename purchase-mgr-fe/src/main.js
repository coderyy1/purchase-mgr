import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import { regDirectives, buyerDirectives, storemanDirectives } from '@/helpers/directive';


import SpaceBetween from '@/components/SpaceBetween.vue';

import 'ant-design-vue/dist/antd.css'


import './assets/jquery-1.12.2'

import './assets/Bootstrap/css/bootstrap.min.css'




const app = createApp(App);

regDirectives(app);
buyerDirectives(app);
storemanDirectives(app);


// Object.defineProperty(app.config.globalProperties, '$$', {
//   get() {
//     return _;
//   },
// });

app
  .use(store)
  .use(router)
  .use(Antd)
  .component('space-between', SpaceBetween)
  .mount('#app')