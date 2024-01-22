import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Router from './router'
import elementPlus from 'element-plus';
import 'element-plus/dist/index.css';

createApp(App)
  .use(elementPlus)
  .use(Router)
  .mount('#app')
