import { useQuery } from '@tanstack/vue-query';
import { getWeatherApi } from '../api/getWeatherApi';
import { toValue } from 'vue';

export function useGetWeatherData(city) {
  return useQuery({
    queryKey: ['weatherData', city],
    queryFn: async () => {
      try {
        const response = await getWeatherApi(toValue(city));

        if (response.error) {
          throw new Error(response.error.message || 'Failed to fetch weather data');
        }

        return response;
      } catch (err) {
        throw new Error(err.message || 'Failed to fetch weather data');
      }
    },
    enabled: !!toValue(city),
    retry: false,
  });
}
