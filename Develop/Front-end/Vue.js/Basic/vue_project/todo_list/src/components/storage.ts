import {reactive, toRefs, Ref} from 'vue';
export type ToDo = {id:number, job: string, date: string, completed: boolean};

export const useStorage = () => {
    const KEY:string = 'my-todo-list';
    const storage_obj = reactive({storage_id: 0});
    const loadTodos = (initTodos: ([])=>void) => {
        let temp_todos: never [] = JSON.parse(localStorage.getItem(KEY) || '[]');
        temp_todos.forEach((todo: ToDo, id: number) => todo.id = id);
        storage_obj.storage_id = temp_todos.length;
        initTodos(temp_todos);
    };
    const saveTodos = (todos: Ref<never []>) => localStorage.setItem(KEY, JSON.stringify(todos.value));
    return {
        ...toRefs(storage_obj),
        loadTodos,
        saveTodos,
    };
};