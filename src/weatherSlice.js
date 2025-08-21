import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API credentials

const apiKey = "57dcd8c190cf685382bae63fed0d8e1e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// const apiKey = "21d7bcc298msh25abdce32868d91p1a9c75jsn28de2de08e91";
// const apiUrl= "https://weather-api167.p.rapidapi.com/api/weather/current?place=London%2CGB&units=standard&lang=en&mode=json";

// Async function (Thunk) to fetch weather
export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city, { rejectWithValue }) => {
    console.log("API call started for:", city); // ✅ Debug
    try {
      const response = await fetch(`${apiUrl}${encodeURIComponent(city)}&appid=${apiKey}`);
      console.log("API response status:", response.status); // ✅ Debug

      if (!response.ok) {
        return rejectWithValue("Invalid city name");
      }

      const data = await response.json();
      console.log("API response data:", data); // ✅ Debug
      return data;
    } catch (err) {
      console.error("API error:", err);
      return rejectWithValue(err.message);
    }
  }
);


const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: null,     // stores weather info
    loading: false, // "Loading..." state
    error: null,    // error message
    history: (() => {
      try {
        const raw = localStorage.getItem("weather_history");
        const parsed = JSON.parse(raw || "[]");
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        return [];
      }
    })(),    // previously searched cities (latest first)
  },
  reducers: {
    clearHistory: (state) => {
      state.history = [];
    },
    removeFromHistory: (state, action) => {
      const cityToRemove = String(action.payload || "").toLowerCase();
      state.history = state.history.filter(
        (c) => String(c).toLowerCase() !== cityToRemove
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // store weather data
        // Update search history using resolved city name when available
        const resolvedCity = (action.payload && action.payload.name) || action.meta?.arg;
        const normalizedCity = String(resolvedCity || "").trim();
        if (normalizedCity) {
          const existingIndex = state.history.findIndex(
            (c) => String(c).toLowerCase() === normalizedCity.toLowerCase()
          );
          if (existingIndex !== -1) {
            state.history.splice(existingIndex, 1);
          }
          state.history.unshift(normalizedCity);
          if (state.history.length > 10) {
            state.history.pop();
          }
        }
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // show error message
      });
  },
});

export const { clearHistory, removeFromHistory } = weatherSlice.actions;
export default weatherSlice.reducer;
