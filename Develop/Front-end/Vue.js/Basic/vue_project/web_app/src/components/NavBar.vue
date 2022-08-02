<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-fluid" href="/">TripleK</a>
            <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul
                :class="{'navbar-nav': true, 'me-auto': menu.me_auto}"
                v-for="menu in menu_category"
                :key="menu.id"
                >
                    <li class="nav-item" v-for="menu_object in menu.value" :key="menu_object.key">
                        <router-link :to="menu_object.URL" class="nav-link">{{menu_object.value}}</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav" v-show="notification.id > 0">
                    <li class="nav-item">
                        <button
                            type="button"
                            class="btn btn-danger"
                            @click.prevent="onOpenNotification">
                        $#128226;    
                        </button>
                    </li>
                </ul> 
            </div>
        </div>
    </nav>
    <teleport to="#notification" v-if="show_notification">
        <div
            :class="'container notification border border-dark rounded-3 mt-3 p-3 bg-'+notification.type">
            <div v-if="notification.type" class="d-flex">
                <span class="me-auto fs-4 fw-bold text-uppercase text-light">
                    {{notification.type}}
                </span>
                <button type="button" class="btn fw-bold" @click.prevent="onCloseNotification">
                    &times;
                </button>
            </div>
            <hr />
            <div class="text-light text-wrap">{{notification.content}}</div>
        </div>
    </teleport>
</template>

<script lang="ts">
    export default {
        name: 'NavBar',
    }
</script>
<script lang="ts" setup>
    import { isStaticArgOf } from '@vue/compiler-core';
import { ref, reactive, computed, onMounted} from 'vue';
    import { RSP_RESULT, default as useAxios } from '/@app_modules/axios';
    import { setCookie, getCookie } from '/@app_modules/cookie';

    const menus: {key:string, value:string, URL:string, position:string}[]= [
        { key: 'home', value: '홈', URL: '/home', position: 'left' },
        { key: 'app', value: '애플리케이션', URL: '/application', position: 'left' },
        { key: 'me', value: 'Profile', URL: '/profile', position: 'right' },
    ];
    const left_menus = computed(() => menus.filter((i:{position:string}) => i.position == 'left'));
    const right_menus = computed(() => menus.filter((i:{position:string}) => i.position == 'right'));
    const menu_category = [
        {
            id:1,
            me_auto: true,
            value: left_menus.value,
        },
        {
            id:2,
            me_auto: false,
            value: right_menus.value,
        },
    ];

    const notification = reactive({id: 0});
    const show_notification = ref(false);
    const onOpenNotification = (evt: Event) => {
        show_notification.value = true;
    };
    const onCloseNotification = (evt:Event) => {
        setCookie('notification', notification.id, 1);
        notification.id = 0;
        show_notification.value = false;
    };
    onMounted(() => {
        const block_noti_id = getCookie('notification') || 0;
        const { axiosGet } = useAxios();
        axiosGet(`/db/notification/${block_noti_id}`, (data:RSP_RESULT) => {
            Object.assign(notification, data.data);
        });
    });
</script>