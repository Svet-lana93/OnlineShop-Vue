import { createApp } from 'vue'
import router from './router'
import BaseComponent from "./BaseComponent.vue";

createApp(BaseComponent).use(router).mount('#app')
