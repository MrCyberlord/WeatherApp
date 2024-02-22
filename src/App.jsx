import Input from "./Input"
import TimeAndLocation from "./TimeandLocation";
import WeatherDetails from "./WeatherDetails";
import Forecast from "./Forecast";
import getFormattedWeatherData from "./WeatherData";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "berlin" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";

      toast.info("Fetching weather for " + message);

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );

        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };

  return ( 

  <div className={` w-auto py-5 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}> 
      <div>
        <Input setQuery={setQuery} units={units} setUnits={setUnits} />
      </div>
      
      {weather && (
        <div >
          <TimeAndLocation weather={weather} />
          
          <WeatherDetails weather={weather} />

          <Forecast title="3-hour Forecast" items={weather.forecast} />
        </div>
      )}

      {/* <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} /> */}

    </div>




  );
}

export default App;
