<script setup>
import { VueSpinner } from 'vue3-spinners';
</script>

<template>
  <div class="spinner">
    <vue-spinner v-bind="$attrs" :size="48" loading="true" color="var(--color-primary)" />
  </div>
</template>

<style scoped>
.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
