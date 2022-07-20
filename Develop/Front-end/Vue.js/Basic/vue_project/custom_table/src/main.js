import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import CustomTable from './components/CustomTable.vue'

const app = createApp(App);
app.component('CustomTable', CustomTable);
app.mount('#app')
