<script setup>
import Button from './Button.vue';
import IconLocation from '../icons/IconLocation.vue';
import { ref, nextTick, inject } from 'vue';
import Input from './Input.vue';
import { cityProvider } from '../constants';

const city = inject(cityProvider);
const inputValue = ref(city.value);
let isEdited = ref(false);

const selectCity = async () => {
  isEdited.value = true;
  await nextTick();
};

const saveCity = () => {
  isEdited.value = false;
  city.value = inputValue.value;
};
</script>

<template>
  <div v-if="isEdited" class="city-input">
    <Input
      ref="my-input"
      v-model="inputValue"
      v-focus
      placeholder="Type city..."
      @keyup.enter="saveCity()"
    />
    <Button class="saveButton" @click="saveCity()"> Save </Button>
  </div>
  <Button v-else class="chooseCity" @click="selectCity()">
    <IconLocation />
    Choose city
  </Button>
</template>

<style scoped>
.chooseCity {
  width: 100%;
}
.city-input {
  display: flex;
  gap: 12px;
}
.saveButton {
  flex-grow: 1;
}
</style>
