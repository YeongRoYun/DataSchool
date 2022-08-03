import Profile from '/@components/Profile.vue'
import Home from '/@components/Home.vue';
import Admin from '/@components/Admin.vue';
import { defineComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

const NotFound = defineComponent({
    template: '<div>Not Found</div>',
});
const routes = [
    { path: '/', redirect: '/home'},
    { path: '/home', name: 'home', component: Home},
    { path: '/profile', name: 'profile', component: Profile},
    { path: '/admin', name: 'admin', component: Admin},
    { path: '/:catchAll(.*)+', component: NotFound},
    
];

export const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active',
    routes,
});