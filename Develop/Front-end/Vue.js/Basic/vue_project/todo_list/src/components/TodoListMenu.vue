<template>
    <div class="row">
        <div class="col">
            <span style="background-color: blue">&nbsp;</span>&nbsp;
            <strong>{{ state }}</strong>
        </div>
        <div class="col">
            <div class="btn-group float-end">
                <button
                    class="btn btn-sm dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown">
                    리스트 필터
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li v-for="key in Object.keys(filters)" :key="key">
                        <a class="dropdown-item" @click="filter = key">
                            {{filters[key].str}}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {inject, computed, ref, Ref, watch, ssrContextKey} from 'vue';
export default {
    name: 'TodoListMenu',
    emits: ['change-filter'],
    setup(props: any, {emit}: any) {
        const filters: any = inject('filters');
        const filter:Ref<number> = ref(0);
        const state = computed(() => filters ? filters[filter.value].str : "Unknown");
        watch(() => filter.value,
            (filter) => {
                emit('change-filter', filter);
            });

        return {
            state,
            filter,
            filters,
        };
    },
};
</script>