import Input from "./Input"
import TimeAndLocation from "./TimeandLocation";
import TodaysWeather from "./TodaysWeather";
import TodaysForecast from "./TodaysForecast";
import MultiDayForecast from "./MultidayForecast";
import getFormattedWeatherData from "./WeatherData";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const [query, setQuery] = useState({ q: "new york" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [fourDayForecast, setFourDayForecast] = useState([]);


  useEffect(() => {
    const fetchWeather = async () => {

      await getFormattedWeatherData({ ...query, units }).then((data) => {
       
        setWeather(data);
        setFourDayForecast(data.fourDayForecast);
      })

      .catch((error) => {
        toast.info('Please enter valid city name'); 
      });


    };

    fetchWeather();
  }, [query, units]);

  
  const formatBackground = () => {
    if (!weather) 
    return "from-cyan-700 to-blue-700";

    const threshold = units === "metric" ? 20 : 60;

    if (weather.temp <= threshold) 
    return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };

  return ( 

  <div className={` w-screen h-screen py-5 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}> 
      <div>
        <Input setQuery={setQuery} units={units} setUnits={setUnits} />
      </div>
      
      {weather && (
        <div >
          <TimeAndLocation weather={weather} />
          
          <TodaysWeather weather={weather} />

          <TodaysForecast items={weather.forecast.slice(0,4)} units={units}/>
       
          <MultiDayForecast items={fourDayForecast} units={units} />

        </div>
      )}

      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />

    </div>

  );
}

export default App;