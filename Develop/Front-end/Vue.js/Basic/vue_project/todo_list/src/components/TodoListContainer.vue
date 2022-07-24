<template>
    <todo-list-new />
    <section class="container">
        <div class="row justify-content-center m-2">
            <todo-list-main />
        </div>
    </section>
</template>

<script lang="ts">
import {ref, readonly, provide, Ref} from 'vue';
import {ToDo, useStorage} from './storage';

export default {
    name: "TodoListContainer",
    setup(props:any, context: any) {
        const todos: any = ref([]);
        const { loadTodos, saveTodos, storage_id } = useStorage();

        provide('todos', readonly(todos));

        const initTodos: ([]) => void = (init_todos) => todos.value = init_todos;
        const addTodo = (job:string, date:string) => {
            todos.value.push({
                id: storage_id.value++,
                job: job,
                date: date,
                completed: false,
            });
            saveTodos(todos);
        };
        const removeTodo = (id:number) => {
            todos.value.splice(id, 1);
            todos.value.forEach((todo: ToDo, id: number) => todo.id = id);
            saveTodos(todos);
        };
        const completeTodo = (id:number) => {
            todos.value[id].completed = true;
            saveTodos(todos);
        };

        provide('addTodo', addTodo);
        provide('removeTodo', removeTodo);
        provide('completeTodo', completeTodo);

        //Load first setup only
        loadTodos(initTodos);
    },
};
</script>

<style>
</style>