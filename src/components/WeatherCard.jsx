import { useSelector } from "react-redux";

const WeatherCard = () => {
  const { data, loading, error } = useSelector((state) => state.weather);

  // Loading
  if (loading) return <p>Loading...</p>;

  // Error
  if (error) return <p className="error">{error}</p>;

  // Before search → no data
  if (!data) return null;

  // Weather condition → choose image
  let weatherIcon = "/images/clouds.png";
  const condition = data.weather[0].main;
  if (condition === "Clear") weatherIcon = "/images/clear.png";
  else if (condition === "Rain") weatherIcon = "/images/rain.png";
  else if (condition === "Drizzle") weatherIcon = "/images/drizzle.png";
  else if (condition === "Mist") weatherIcon = "/images/mist.png";

  return (
    <div className="weather">
      <img src={weatherIcon} alt="weather" className="weather-icon" />
      <h1 className="temp">{Math.round(data.main.temp)}°C</h1>
      <h2 className="city">{data.name}</h2>

      <div className="details">
        <div className="col">
          <img src="/images/feels_like.png" alt="feels_like" />
          <div>
            <p className="feels_like">{data.main.feels_like}°C </p>
            <p>Feels_Like</p>
          </div>
        </div>
        <div className="col">
          <img src="/images/humidity.png" alt="humidity" />
          <div>
            <p className="humidity">{data.main.humidity} %</p>
            <p>Humidity</p>
          </div>
        </div>
        <div className="col">
          <img src="/images/wind.png" alt="wind" />
          <div>
            <p className="wind">{data.wind.speed} km/h</p>
            <p>Wind Speed</p>
          </div>
        </div>
        <div className="col">
          <img src="/images/visibility.png" alt="visibility" />
          <div>
            <p className="visibility">{data.visibility} mtr</p>
            <p>Visibility</p>
          </div>
        </div>
        <div className="col">
          <img src="/images/sea_level.png" alt="sea_level" />
          <div>
            <p className="sea_level">{data.main.sea_level} mtr </p>
            <p>Sea_Level</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
