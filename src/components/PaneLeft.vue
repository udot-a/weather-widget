<script setup>
import { computed } from 'vue';
import IconLocation from '../icons/IconLocation.vue';
import { formatDate } from '../utils/dateUtils';
import { useGetWeatherData } from '../services/queries/useGetWeatherData';

const props = defineProps({
  activeIndex: Number,
  city: String,
});

const { data } = useGetWeatherData(() => props.city);

const dayData = computed(() => {
  return data?.value?.forecast?.forecastday?.[props.activeIndex] ?? null;
});

const imageUrl = computed(() => {
  return dayData.value?.day?.condition?.icon ? `https:${dayData.value.day.condition.icon}` : '';
});

// const imageUrl = dayData?.day?.condition?.icon ? `https:${dayData.day.condition.icon}` : '';
</script>

<template>
  <div class="left">
    <div v-if="dayData" class="date-block">
      <div class="day">
        {{ formatDate(dayData.date)[0] }}
      </div>
      <div class="date">
        {{ formatDate(dayData.date)[1] }}
      </div>
      <div class="city">
        <IconLocation :size="24" />
        {{ city }}
      </div>
    </div>
    <div v-if="dayData" class="date-block">
      <img :src="imageUrl" alt="condition" class="image" />
      <div class="temperature">{{ Math.round(dayData.day.avgtemp_c) }}°C</div>
      <div class="condition">{{ dayData.day.condition.text }}</div>
    </div>
  </div>
</template>

<style scoped>
.left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 48px 32px 84px;
  width: 500px;
  height: 660px;
  border-radius: 30px;
  background-image: url('/card_bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  color: var(--color-primary);
}
.date-block {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.day {
  font-size: 37px;
  font-weight: 700;
}

.date {
  font-size: 22px;
  font-weight: 500;
}

.city {
  display: flex;
  gap: 8px;
  font-size: 20px;
  font-weight: 600;
  align-items: center;
}

.temperature {
  font-size: 50px;
  font-weight: 700;
}

.condition {
  font-size: 30px;
  font-weight: 700;
}
.image {
  width: 110px;
  height: 110px;
  object-fit: cover;
}
</style>
