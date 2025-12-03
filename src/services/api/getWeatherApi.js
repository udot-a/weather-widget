import { apiEndpoint } from '../../constants';

export async function getWeatherApi(city) {
  if (!city) {
    throw new Error('City is required to fetch weather data');
  }
  const params = new URLSearchParams({
    q: city,
    key: '6bfe5e35fafe42e085f152924252611',
    days: 4,
  });

  return await (await fetch(`${apiEndpoint}forecast.json?${params.toString()}`)).json();
}
