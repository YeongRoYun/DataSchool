import fnSort from './useSort';
import {ToDo} from './storage';
import {inject} from 'vue';

// Slice with no params copy array
export const useFilter = () => {
    const _today:string|undefined = inject('today');
    const today = _today ? _today : new Date().toISOString().split('T')[0];
    
    const getPendingTodos = (todos: any) => todos.value.filter((todo:ToDo) => 
        todo.date < today && !todo.completed).slice().sort(fnSort);
    
    const getActiveTodayTodos = (todos: any) => todos.value.filter((todo:ToDo) => 
        today ? (todo.date == today && !todo.completed) : false).slice().sort(fnSort);
    
    const getCompletedTodayTodos = (todos: any) => todos.value.filter((todo:ToDo) =>
        today ? (todo.date == today && todo.completed) : false).slice().sort(fnSort);
    
    const getAllTodayTodos = (todos: any) => getActiveTodayTodos(todos)
        .concat(getCompletedTodayTodos(todos))
        .slice()
        .sort(fnSort);
    
    const getAllTodos = (todos: any) => todos.value.slice().sort(fnSort);

    return {
        getPendingTodos,
        getActiveTodayTodos,
        getCompletedTodayTodos,
        getAllTodayTodos,
        getAllTodos,
    };
};

