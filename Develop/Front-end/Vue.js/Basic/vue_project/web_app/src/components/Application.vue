<template>
    <p class="m-2">
        총 {{applications_count}} 개의 애플리케이션 중
        {{ applications.length}}개가 보여집니다.
    </p>
    <hr/>
    <div class="row row-cols-1 row-cols-sm-3 g-2 m-0">
        <div class="col" v-for="data in applications" :key="data.id">
            <app-card :data="data" />
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "Application",
}
</script>

<script lang="ts" setup>
import {onMounted, computed} from 'vue';
// import {useStore} from 'vuex';
import {useApplications} from '/@compositions/useApplications';
import useAxios from '/@app_modules/axios';
import { RSP_RESULT } from '/@app_modules/axios';

// const store = useStore();
const {applications_count, applications, setApplications} = useApplications();
const { axiosGet } = useAxios();
// const applications = computed(() => store.getters['applications/applications']());
// const applications_count = computed(()=>store.getters['applications/applications_count']);

onMounted(() => {
    // if(!store.getters['applications/applications_count']) {
    //     axiosGet('/db/applications', (data:RSP_RESULT) => {
    //         store.dispatch('applications/setApplications', data.data);
    //     });
    // }
    if(!applications_count.value) {
        axiosGet('/db/applications', (data:RSP_RESULT) => {setApplications(data.data)});
    }
});
</script>