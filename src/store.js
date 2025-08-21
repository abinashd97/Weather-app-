import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice"; // our weather logic

const store = configureStore({
  reducer: {
    weather: weatherReducer, // "weather" slice
  },
});

// Persist weather history to localStorage
let lastSavedHistoryJson = null;
store.subscribe(() => {
  const state = store.getState();
  const history = state?.weather?.history || [];
  try {
    const json = JSON.stringify(history);
    if (json !== lastSavedHistoryJson) {
      localStorage.setItem("weather_history", json);
      lastSavedHistoryJson = json;
    }
  } catch (e) {
    // ignore persistence errors (e.g., private mode)
  }
});

export default store;
