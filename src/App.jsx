import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "./weatherSlice";
import { useEffect } from "react";
import SearchBox from "./components/SearchBox";
import WeatherCard from "./components/WeatherCard";

function App() {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather);

  useEffect(() => {
    let initialCity = "New Delhi";
    try {
      const raw = localStorage.getItem("weather_history");
      const parsed = JSON.parse(raw || "[]");
      if (Array.isArray(parsed) && parsed.length > 0) {
        initialCity = String(parsed[0] || initialCity);
      }
    } catch (e) {
      // ignore
    }
    dispatch(fetchWeather(initialCity));
  }, [dispatch]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Check Your Weather Report</h1>
      <div className="card">
        <SearchBox />
        <WeatherCard />
      </div>
    </div>
  );
}

export default App;
