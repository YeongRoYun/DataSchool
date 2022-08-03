import {createApp} from 'vue/dist/vue.esm-bundler';
import App from '/@/App.vue';
import NavBar from '/@components/NavBar.vue';
import Profile from '/@components/Profile.vue';
import Application from '/@components/Application.vue';
import AppCard from '/@components/AppCard.vue';
import Blog from '/@components/Blog.vue';
import Home from '/@components/Home.vue';
import Admin from '/@components/Admin.vue';
import Login from '/@components/Login.vue';
import Editor from '/@components/Editor.vue';

import store from '/@store';
import { router } from '/@router';

import './style.css';
import 'bootstrap/dist/js/bootstrap.esm.min';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);
app.use(store);
app.use(router);
app.component(NavBar.name, NavBar);
app.component(Profile.name, Profile);
app.component(AppCard.name, AppCard);
app.component(Application.name, Application);
app.component(Blog.name, Blog);
app.component(Home.name, Home);
app.component(Admin.name, Admin);
app.component(Login.name, Login);
app.component(Editor.name, Editor);

app.mount('#app');