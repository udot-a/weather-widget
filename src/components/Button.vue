<script setup></script>

<template>
  <button class="button">
    <div><slot name="icon" /></div>
    <slot />
  </button>
</template>

<style scoped>
.button {
  padding: 14px;
  background: var(--gradient);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-family: var(--font);
  font-size: 20px;
  font-weight: 600;
  color: var(--color-primary);
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  height: 53px;
}
.button:hover {
  background: var(--gradient-inverted);
}
</style>
