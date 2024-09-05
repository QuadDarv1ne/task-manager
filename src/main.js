import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/themes.css';

createApp(App).mount('#app')

// Установите начальную тему
document.documentElement.setAttribute('data-theme', 'light');
