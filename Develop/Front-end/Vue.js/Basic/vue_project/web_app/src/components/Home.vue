<template>
    <ul class="nav nav-tabs justify-content-end">
        <li class="nav-item">
            <a
                class="nav-link"
                :class="{active : type == 'blog'}"
                href="#"
                @click.prevent="type ='blog'"
            >Blog</a>
        </li>
        <li class="nav-item">
            <a
                class="nav-link"
                :class="{active: type == 'clip'}"
                href="#"
                @click.prevent="type='clip'"
            >Clips</a>
        </li>
    </ul>
    <!-- <div v-is="type"></div> -->
    <blog v-if="type=='blog'"></blog>
    <clip v-else-if="type=='clip'"></clip>
</template>

<script lang="ts">
export default {
    name: 'Home',
};
</script>

<script lang="ts" setup>
import {ref, defineComponent} from 'vue';
const Clip = defineComponent({
    template: `
        <div class="row">
            이 공간은 클립 공간이에요!!
        </div>
    `,
});
const type = ref('blog');
</script>