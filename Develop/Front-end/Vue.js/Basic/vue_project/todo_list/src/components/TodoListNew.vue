<template>
    <section class="mb-5">
        <div class="container">
            <div class="row justify-content-center m-2">
                <div class="col border border-primary rounded">
                    <input
                        type="text"
                        id="todo_input"
                        class="form-control my-2"
                        v-model="job"
                        placeholder="여기에 할일을 적으세요" />
                    <div class="row my-2">
                        <div class="col-6">
                            <input type="date" v-model="date" :min="today" />
                        </div>
                        <div class="col-6">
                            <button
                                type="button"
                                class="btn btn-primary btn-sm float-end"
                                @click.prevent="onAddToDo"
                            >작업 추가</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
    import { reactive, toRefs, inject } from 'vue';
    export default {
        name: 'TodoListNew',
        emits: ['onAddToDo'],
        setup(props: any, context: any) {
            const today: string | undefined = inject('today');

            const addTodo: ((job: string, date: string) => void) | undefined= inject('addTodo');
            const val_obj = reactive({
                job: '',
                date: today ? today : new Date().toISOString().split('T')[0],
                today: today ? today : new Date().toISOString().split('T')[0],
            });

            const onAddToDo = () => {
                if (val_obj.job.length > 0) {
                    addTodo ? addTodo(val_obj.job, val_obj.date): console.log('addTodo not found');
                    val_obj.job = '';
                    val_obj.date = val_obj.today;
                }
            };
            return {
                ...toRefs(val_obj),
                onAddToDo,
            };
        },
    }
</script>