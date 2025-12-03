<script setup>
import { ref, provide, watch } from 'vue';
import PaneRight from './components/PaneRight.vue';
import { cityProvider } from './constants';
import PaneLeft from './components/PaneLeft.vue';

const city = ref('Kyiv');
const error = ref(null);
const activeIndex = ref(0);

provide(cityProvider, city);

const getCity = async cityName => {
  city.value = cityName;
};
watch(city, newCity => {
  getCity(newCity);
});
</script>

<template>
  <main class="main">
    <PaneLeft :city :active-index="activeIndex" />
    <div class="right">
      <PaneRight
        :error
        :city
        :active-index="activeIndex"
        @select-index="index => (activeIndex = index)"
      />
    </div>
  </main>
</template>

<style scoped>
.main {
  display: flex;
  align-items: center;
  justify-content: center;
}

.right {
  background: var(--color-bg-main);
  padding: 50px;
  border-radius: 25px;
  position: relative;
}
</style>
