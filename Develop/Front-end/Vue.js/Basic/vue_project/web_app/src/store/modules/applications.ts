export const applications = {
    namespaced: true,
    state: () => ({
        applications: [],
    }),
    getters: {
        applications_count: (state:any) => {
            return state.applications.length;
        },
        applications: (state:any) => (filter:string = "") => {
            if (filter != "") {
                return state.applications.filter((i:{name:string}) => i.name == filter);
            } else {
                return state.applications;
            }
        },
    },
    mutations: {
        SET_DATA(state:any, data:any) {
            state.applications = data;
        },
    },
    actions: {
        setApplications: ({ commit }: any, data:any) => {
            if(data.length > 0) {
                commit('SET_DATA', data);
            }
        },
    }
}