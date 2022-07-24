<template>
    <header>
        <div class="my-5">
            <h1>나의 할 일</h1>
            <em>{{ today }}</em>
        </div>
    </header>
    <todo-list-container />
</template>

<script lang="ts">
    export default {
        name: 'App',
    };
</script>
<script lang="ts" setup>
import {inject} from 'vue';
const today = inject("today");
</script>

<style scoped>
    hgroup {
        text-align: center;
        font-family: 'Arial Bold';
    }

    hgroup h1 {
        font-weight: bolder;
    }
</style>