<template>
  <toast />
  <nav-bar />
  <div id="notification" />
  <router-view></router-view>
</template>

<script lang="ts">
import {ref, provide} from 'vue';

export default {
  name: 'App',
  setup() {
    const toast = ref('');
    provide('toast', toast);
  }
};
</script>