import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather, clearHistory, removeFromHistory } from "../weatherSlice";

const SearchBox = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const history = useSelector((state) => state.weather.history);

  const handleSearch = () => {
    if (city.trim()) {
      console.log("Searching for:", city); // ✅ Debug
      dispatch(fetchWeather(city));
    } else {
      console.log("City is empty"); // ✅ Debug
    }
  };

  const handleUseHistoryItem = (item) => {
    setCity(item);
    dispatch(fetchWeather(item));
  };

  return (
    <div>
      <div className="search">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button onClick={handleSearch}>
          <img src="/images/search.png" alt="search" />
        </button>
      </div>

      {history && history.length > 0 && (
        <div className="history">
          <div className="history-header">
            <span>Recent</span>
            <button className="history-clear" onClick={() => dispatch(clearHistory())}>Clear</button>
          </div>
          <ul className="history-list">
            {history.map((item) => (
              <li key={item} className="history-item">
                <button className="history-chip" onClick={() => handleUseHistoryItem(item)}>
                  {item}
                </button>
                <button
                  aria-label={`Remove ${item}`}
                  className="history-remove"
                  onClick={() => dispatch(removeFromHistory(item))}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
