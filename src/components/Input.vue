<script setup>
const data = defineModel({
  type: String,
  required: true,
});
</script>

<template>
  <input ref="el" v-bind="$attrs" v-model="data" type="text" class="input" />
</template>

<style scoped>
.input {
  color: var(--color-primary);
  background: var(--color-bg-card);
  border-radius: 10px;
  box-shadow: 1px 2px 4px 0px var(--color-bg-main);
  border: none;
  padding: 0 10px;
  font-size: 18px;
  width: 260px;
  height: 53px;
}
.input::placeholder {
  color: var(--color-text-placeholder);
}
</style>
