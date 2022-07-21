import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {TodoListContainer, TodoListNew, TodoListMain, TodoListMenu, TodoList} from './components';

const app = createApp(App);

app.component("TodoListContainer", TodoListContainer);
app.component("TodoListNew", TodoListNew);
app.component("TodoListMain", TodoListMain);
app.component("TodoListMenu", TodoListMenu);
app.component("TodoList", TodoList);

app.mount('#app');
