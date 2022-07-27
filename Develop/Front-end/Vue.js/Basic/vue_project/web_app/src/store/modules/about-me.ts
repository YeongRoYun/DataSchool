type Resume = {date:string, title:string, content:string, URL:string};
type State = {name:string, email: string, resume: Resume[]};
type Data = {[key:string]:string, key:"name"|"email", value:string};

export const about_me = {
    namespaced: true,
    state: ():State => ({
        name: "",
        email: "",
        resume: [],
    }),
    getters: {
        user_data: (state:State) => state,
        name: (state:State) => state.name,
        email: (state:State) => state.email,
        resume: (state:State) => state.resume,
    },
    mutations: {
        SET_DATA(state:State, data:Data) {
            state[data.key] = data.value;
        },
    },
    actions: {
        setAboutMeData: ({commit, state}: {commit:any, state:State}, data:Data) => {
            Object.keys(data).forEach((key:string) => {
                if(Object.keys(state).find((skey:string) => skey === key)) {
                    commit('SET_DATA', {key: key, value: data[key]});
                }
            })
        }
    }
}