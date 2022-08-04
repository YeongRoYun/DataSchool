<template>
    <div style="position: absolute; top: 60px; right: 10px">
        <div
            v-for="t in toasts.data"
            :key="t.id"
            class="toast show text-white bg-danger"
            role="alert"
        >
            <div class="toast-bs-header">
                <strong class="me-auto">Warning</strong>
                <button type="button" class="btn-close" @click.prevent="onClose(t.id)"></button>
            </div>
            <div class="toast-bs-body">{{ t.message}}</div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Toast',
}
</script>

<script lang="ts" setup>
import {Ref, ref, inject, watch, reactive, onMounted} from 'vue';
const toast:Ref<string> = inject("toast", ref(""));
const toasts:{data:{id:number, message:string, start:number}[]} = reactive({
    data: []
});
let id = 0;

watch(
    () => toast,
    (n, o) => {
        if(n.value.length > 0) {
            const new_id = id++;
            toasts.data.unshift({
                id: new_id,
                message: n.value,
                start: new Date().getTime(),
            });
            toast.value = "";
        }
    },
    {deep: true},
);
const onClose = (close_id:number) => {
    toasts.data = toasts.data.filter((i) => i.id != close_id);
};
onMounted(() => {
    setInterval(() => {
        const now = new Date().getTime();
        toasts.data.forEach((i) => {
            if (now - i.start > 5000) {
                toasts.data = toasts.data.filter((j) => j.id != i.id);
            }
        });
    });
});
</script>