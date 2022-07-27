import {createApp} from 'vue';
import App from '/@/App.vue';
import NavBar from '/@components/NavBar.vue';
import Profile from '/@components/Profile.vue';
import Application from '/@components/Application.vue';
import AppCard from '/@components/AppCard.vue';
import RouterView from '/@components/RouterView.vue';

import store from '/@store';

import './style.css';
import 'bootstrap/dist/js/bootstrap.esm.min';
import 'bootstrap/dist/css/bootstrap.min.css';


const app = createApp(App);
app.use(store);
app.component(NavBar.name, NavBar);
app.component(Profile.name, Profile);
app.component(AppCard.name, AppCard);
app.component(Application.name, Application);
app.component(RouterView.name, RouterView);

app.mount('#app');