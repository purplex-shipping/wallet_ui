import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'
const pinia = createPinia()

import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

import router from './router';


createApp(App).use(router).use(pinia).use(ToastPlugin).mount('#app')
