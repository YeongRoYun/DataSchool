import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {TodoListContainer, TodoListNew, TodoListMain, TodoListMenu, TodoList} from './components';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.esm.min'

const app = createApp(App);
app.provide('today', new Date().toISOString().split('T')[0]);

app.component(TodoListContainer.name, TodoListContainer);
app.component(TodoListNew.name, TodoListNew);
app.component(TodoListMain.name, TodoListMain);
app.component(TodoListMenu.name, TodoListMenu);
app.component(TodoList.name, TodoList);

app.mount('#app');
