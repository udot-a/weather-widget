# Weather Widget

A Vue 3 weather dashboard with a multi-day forecast, city search and cached data fetching through TanStack Query.

![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black)
![Firebase Hosting](https://img.shields.io/badge/Firebase_Hosting-FFCA28?style=flat-square&logo=firebase&logoColor=black)

**Live demo:** [weather-widget-0978.web.app](https://weather-widget-0978.web.app) · **Author:** Andrii Udot · [CV](https://udot-a.github.io/front-end-developer-cv/)

## Overview

A single-page weather widget built with Vue 3 (Composition API, `<script setup>`) and Vite. It loads daily forecast data from the [WeatherAPI.com](https://www.weatherapi.com/) forecast endpoint, shows the selected day in a large card and lets you switch between forecast days or change the city. TanStack Vue Query manages server state, and GitHub Actions deploys the app to Firebase Hosting.

## Features

- **Selected-day card**: the left pane shows the weekday, full date and city for the selected day, along with the WeatherAPI condition icon, the average temperature and the condition text.
- **Forecast strip**: clickable day cards (the app requests `days=4`) with a weekday label, the average °C and a custom SVG icon. The icon (sun, cloud or rain) is chosen from the WeatherAPI condition code. Selecting a card updates both panes.
- **Daily stats**: average humidity and other per-day metrics for the selected day.
- **City switching**: "Choose city" opens an input that is focused automatically by a custom global `v-focus` directive. Press Enter or click Save to update the city and fetch new data. The default city is Kyiv.
- **Loading and error states**: a spinner (`vue3-spinners`) shows while data loads. API errors, such as an unknown city, appear as a banner. Retries are disabled so bad input fails fast.
- **Shared, cached server state**: both panes use the same `useGetWeatherData` composable. Because TanStack Query keys it by `['weatherData', city]`, one request feeds both panes and results are cached per city.
- **Code quality**: ESLint 9 flat config with `eslint-plugin-vue`. Prettier formatting is enforced as a lint rule.
- **CI/CD**: GitHub Actions builds the app and deploys it to Firebase Hosting on every push to `main`. Pull requests get preview channels.

## Tech stack

| Area         | Tools                                                                                   |
| ------------ | --------------------------------------------------------------------------------------- |
| Framework    | Vue 3.5 (Composition API, `<script setup>`, `defineModel`, `provide`/`inject`)          |
| Build        | Vite 7 (Rolldown-powered `rolldown-vite`), `@vitejs/plugin-vue`                         |
| Server state | `@tanstack/vue-query` 5                                                                 |
| Data source  | WeatherAPI.com Forecast API (`/v1/forecast.json`)                                       |
| UI           | Scoped CSS with CSS custom properties, Montserrat (Google Fonts), SVG icon components, `vue3-spinners` |
| Quality      | ESLint 9, `eslint-plugin-vue`, Prettier 3                                               |
| Hosting / CI | Firebase Hosting, GitHub Actions                                                        |

## Architecture

`App.vue` owns two pieces of state: `city` (a `ref`, default `Kyiv`) and `activeIndex` (the selected forecast day). It provides `city` through a `Symbol` key from `constants.js`, and `CitySelect` injects that ref to update it. Both panes receive `city` as a prop and call `useGetWeatherData(() => props.city)`. The getter is part of the query key, so a city change triggers a refetch automatically. `getWeatherApi` builds the request with `URLSearchParams`. The query function turns WeatherAPI error payloads into thrown errors, which drive the UI through `isError` and `error`. When a forecast card is clicked, `PaneRight` emits `select-index` and `App` updates `activeIndex`. Both panes then read `forecast.forecastday[activeIndex]`.

```
src/
├── App.vue                    # Root: city and selected-day state, provide/inject
├── main.js                    # Bootstrap: VueQueryPlugin, global v-focus directive
├── constants.js               # WeatherAPI base URL, provide/inject key
├── style.css                  # Global styles and CSS variables (colors, gradients, font)
├── components/
│   ├── PaneLeft.vue           # Selected-day card
│   ├── PaneRight.vue          # Stats, forecast strip, city picker, loading/error states
│   ├── ForecastCard.vue       # A single forecast day
│   ├── CitySelect.vue         # "Choose city" button / city input
│   └── Button, Input, Stat, Spinner, Error .vue
├── icons/                     # SVG icon components: sun, cloud, rain, location
├── services/
│   ├── api/getWeatherApi.js           # fetch wrapper for /forecast.json
│   └── queries/useGetWeatherData.js   # TanStack Query composable
└── utils/dateUtils.js         # Weekday and date formatting
```

## Getting started

### Prerequisites

- Node.js `^20.19.0` or `>=22.12.0` (required by Vite 7)
- npm

### Install and run

```bash
git clone https://github.com/udot-a/weather-widget.git
cd weather-widget
npm install
npm run dev        # http://localhost:5173
```

### Configuration

No environment variables are needed. The WeatherAPI.com base URL is set in `src/constants.js`, and the API key is passed as the `key` query parameter in `src/services/api/getWeatherApi.js`. To use your own key, create a free account at [weatherapi.com](https://www.weatherapi.com/) and replace the key there.

## Scripts

| Script            | Description                                         |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Start the Vite dev server with hot module reload    |
| `npm run build`   | Build for production into `dist/`                   |
| `npm run preview` | Serve the production build locally                  |
| `npm run lint`    | Run ESLint (with Prettier rules) on the project     |

## Deployment

`firebase.json` serves `dist/` and rewrites all routes to `index.html`. The workflows in `.github/workflows/` run `npm ci && npm run build` and then deploy with `FirebaseExtended/action-hosting-deploy`. Pushes to `main` go to the live channel, and pull requests from this repository get a preview channel. The workflows need the repository secret `FIREBASE_SERVICE_ACCOUNT_WEATHER_WIDGET_0978`.

---

Built by **Andrii Udot** — [CV](https://udot-a.github.io/front-end-developer-cv/) · [LinkedIn](https://www.linkedin.com/in/andrii-udot-09181519a)
