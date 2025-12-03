<script setup>
import { computed } from 'vue';
import Error from './Error.vue';
import Stat from './Stat.vue';
import ForecastCard from './ForecastCard.vue';
import CitySelect from './CitySelect.vue';
import { useGetWeatherData } from '../services/queries/useGetWeatherData';
import Spinner from './Spinner.vue';

const emit = defineEmits(['select-index']);

const props = defineProps({
  error: String,
  city: String,
  activeIndex: Number,
});

const { data, isPending, error, isError } = useGetWeatherData(() => props.city);

const dataModified = computed(() => [
  { label: 'Humidity', stat: `${data?.value?.current?.humidity ?? '--'}%` },
  { label: 'Cloud', stat: `${data?.value?.current?.cloud ?? '--'}%` },
  { label: 'Wind speed', stat: `${data?.value?.current?.wind_kph ?? '--'}kph` },
]);

const dataForecast = computed(() => data?.value?.forecast?.forecastday ?? []);
</script>

<template>
  <Spinner v-if="isPending" />
  <Error v-if="isError" :error="error?.message" class="error" />
  <div v-show="!error" class="city">{{ props.city }}</div>
  <Stat v-for="item of dataModified" v-bind="item" :key="item.label" />
  <div v-if="data" class="forecast">
    <ForecastCard
      v-for="(dayData, index) in dataForecast"
      :key="dayData.date"
      :is-active="index === props.activeIndex"
      :condition-code="dayData?.day?.condition?.code"
      :temperature="dayData?.day?.avgtemp_c"
      :day="dayData?.date"
      @click="() => emit('select-index', index)"
    />
  </div>
  <CitySelect />
</template>

<style scoped>
.city {
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text-placeholder);
  margin-bottom: 10px;
}

.error {
  padding: 10px;
  top: 0;
  position: absolute;
  font-size: 16px;
  font-weight: 500;
  color: red;
  background-color: var(--color-bg-card);
  margin-bottom: 10px;
  text-align: center;
  border-radius: 0px 0px 25px 25px;
}
.forecast {
  display: flex;
  gap: 2px;
  margin: 10px 0px;
}
</style>
