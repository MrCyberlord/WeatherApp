import { DateTime } from "luxon";

const API_KEY = "cb31511f0e5ffb8fede59d926e445133";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(`${BASE_URL}/${infoType}`);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
    
    // return fetch(url).then((res) => res.json());
    return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error('City not found'); // Throws an error if response is not OK
      }
      return res.json();
    });

};

const formatCurrentWeather = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed },
    } = data;

    // console.log('THIS IS DATA', data);

    const { main: details, icon } = weather[0];
    return {
        lat,
        lon,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        dt,
        country,
        sunrise,
        sunset,
        details,
        icon,
        speed,
    };
};

const formatForecastWeather = (data) => {
    let { city: { timezone }, list } = data;

    list = list.map((item) => {
        const date = new Date(item.dt * 1000); 
        const formattedDate = date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
        const time = item.dt_txt.split(' ')[1]; 
        const timePart = item.dt_txt.split(' ')[1]; // Splits the string and takes the time part

        return {
            datetime: `${formattedDate} ${time}`, 
            temp: item.main.temp,
            icon: item.weather[0].icon,
            time: timePart,
        };
    });


    return { timezone, list };
};




const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData("weather", searchParams).then(formatCurrentWeather);

    const { lat, lon } = formattedCurrentWeather;
   
    const formattedForecastWeather = await getWeatherData("forecast", {
        lat,
        lon,
        units: searchParams.units,
        cnt: 40 
    }).then(formatForecastWeather);


    const fourDayForecast = extractFourDayForecast(formattedForecastWeather.list);

    // console.log("FOUR DAY FORECAST", fourDayForecast)

    return { ...formattedCurrentWeather, forecast: formattedForecastWeather.list, fourDayForecast };
};


const extractFourDayForecast = (forecastList) => {
    const dailyForecasts = [];
    // console.log("Forecast list:", forecastList);
    const today = new Date().getDate(); 

    let startIndex = 0; 
    while (startIndex < forecastList.length && new Date(forecastList[startIndex].datetime.split(', ')[1]).getDate() <= today) {
        startIndex++;
    }

    for (let i = startIndex; i < forecastList.length && dailyForecasts.length < 4; i += 8) {
        const item = forecastList[i];
        const [day, date] = item.datetime.split(', '); 
        
        dailyForecasts.push({
            day: day, 
            date: date.substring(0, date.lastIndexOf(' ')), 
            temp: item.temp,
            icon: item.icon,
        });
    }

    // console.log('DAILY FORECASTS', dailyForecasts)

    return dailyForecasts;
};


const formatToLocalTime = (
    secs,
    zone,
    format = "| cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
    `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;
export { formatToLocalTime, iconUrlFromCode };
