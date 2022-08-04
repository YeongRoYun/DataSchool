import { reactive } from 'vue';

export const useProfile = () => {
    const state:any = reactive({name: null, email: null, resume: []});
    const SET_DATA = (data:{[key:string]:any}) => {
        state[data.key] = data.value;
    }
    const setAboutMeData = (data:any) => {
        Object.keys(data).forEach((key) => {
            if(Object.keys(state).find((skey) => skey === key)) {
                SET_DATA({key, value: data[key]});
            }
        });
    };
    return {
        user_data: state,
        setAboutMeData,
    }
}