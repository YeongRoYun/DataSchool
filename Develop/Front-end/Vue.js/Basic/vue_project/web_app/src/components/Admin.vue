<template>
<div v-if="state == 'ok'">
    <div class="row tet-right pr-sm-2">
        <small><a href='#' @click.prevent="onLogout">Logout</a></small>
    </div>
    <editor />
</div>
<div v-else-if="state=='loading'">Loading...</div>
<login v-else :email="email" :type="state" @state="state = 'ok'" />
</template>

<script lang="ts">
export default {
    name: 'Admin',
}
</script>

<script lang="ts" setup>
import {ref ,onBeforeMount} from 'vue';
import {getCookie, setCookie} from '/@app_modules/cookie';
import useLogin from '/@app_modules/login';
import {RSP_RESULT} from '/@app_module/axios';


const state = ref('loading');
const email=ref(getCookie('email'));
const token = ref(getCookie('token'));

onBeforeMount(() => {
    const { checkToken } = useLogin();
    const auto_login = getCookie('stay') == 'true';

    email.value = !email.value ? 'vue' : email.value;
    token.value = !token.value ? '' : token.value;

    checkToken(email.value, token.value)
        .then((result:RSP_RESULT) => {
            if(auto_login) {
                state.value = 'ok';
            } else if(result.data.email == 'vue') {
                state.value = 'update';
                email.value = '';
            } else {
                state.value = 'login';
            }
        })
        .catch((err:Error) => {
            state.value = 'login';
        })});

const onLogout = (evt:Event) => {
    setCookie('token', '');
    state.value='login';
};
</script>