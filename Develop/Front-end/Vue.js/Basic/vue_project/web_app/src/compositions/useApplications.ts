import { reactive, computed } from 'vue';

export const useApplications = () => {
    const state = reactive({ applications: [] });
    const SET_DATA = (data:any) => {
        state.applications = data;
        console.log(state.applications);
    };
    const applications_count = computed(() => state.applications.length);
    const applications = (filter:any = null) => {
        if (filter) {
            return computed(() => state.applications.filter((i:any)=>i.name == filter));
        } else {
            return computed(() => state.applications);
        }
    };
    const setApplications = (data:any) => {
        if(data.length > 0) {
            SET_DATA(data);
        }
    };
    return {
        applications_count,
        applications,
        setApplications,
    };
}