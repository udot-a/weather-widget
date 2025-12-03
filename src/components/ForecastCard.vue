<script setup>
import { defineProps, computed } from 'vue';
import IconSun from '../icons/IconSun.vue';
import IconCloud from '../icons/IconCloud.vue';
import IconRain from '../icons/IconRain.vue';
import { getDayFromDate } from '../utils/dateUtils.js';

const { isActive, temperature, conditionCode, day } = defineProps({
  isActive: Boolean,
  temperature: Number,
  conditionCode: Number,
  day: String,
});

const color = computed(() => {
  if (isActive) {
    return 'var(--color-primary-inverted)';
  }
  return 'white';
});

const iconName = computed(() => {
  if (conditionCode >= 1000 && conditionCode < 1030) {
    return 'sun';
  } else if (conditionCode >= 1030 && conditionCode < 1200) {
    return 'cloudy';
  }

  return 'rain';
});
</script>

<template>
  <div class="card" :class="{ active: isActive }">
    <IconSun v-show="iconName === 'sun'" :color :size="55" />
    <IconCloud v-show="iconName === 'cloudy'" :color :size="55" />
    <IconRain v-show="iconName === 'rain'" :color :size="55" />

    <div class="day" :style="{ color }">
      {{ getDayFromDate(day) }}
    </div>

    <div class="temp" :style="{ color }">{{ temperature ?? '--' }}°C</div>
  </div>
</template>

<style scoped>
.card {
  background: var(--color-bg-card);
  color: var(--color-primary);
  border-radius: 15px;
  padding: 10px;
  width: 105px;
  height: 165px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;

  &:not(.active):hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background: var(--color-bg-last-card);
    transform: translateY(-5px);
    transition: all 0.3s ease;
  }
}

.active {
  background: var(--color-primary);
  color: var(--color-primary-inverted);
}
.day {
  font-size: 20px;
  font-weight: 400;
}
.temp {
  font-size: 20px;
  font-weight: 700;
}
</style>
