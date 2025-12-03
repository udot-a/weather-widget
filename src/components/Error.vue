<script setup>
const props = defineProps({
  error: String,
});
</script>

<template>
  <div v-show="!!error">
    {{ props.error }}
  </div>
</template>

<style scoped></style>
