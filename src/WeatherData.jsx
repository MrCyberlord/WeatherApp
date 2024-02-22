import { DateTime } from "luxon";

const API_KEY = "cb31511f0e5ffb8fede59d926e445133";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(`${BASE_URL}/${infoType}`);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
    
    return fetch(url).then((res) => res.json());
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

    console.log('THIS IS DATA', data);

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

// const formatForecastWeather = (data) => {
//     let { city: { timezone }, list } = data;
//     list = list.map((item) => {
//         return {
//             title: formatToLocalTime(item.dt, timezone, "ccc hh:mm a"),
//             temp: item.main.temp,
//             icon: item.weather[0].icon,
//         };
//     });

//     return { timezone, list };
// };

const formatForecastWeather = (data) => {
    let { city: { timezone }, list } = data;
    list = list.map((item) => {
        const date = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const formattedDate = date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
        const time = item.dt_txt.split(' ')[1]; // Extracting time from dt_txt field

        return {
            datetime: `${formattedDate} ${time}`, // Combine date and time
            temp: item.main.temp,
            icon: item.weather[0].icon,
        };
    });

    return { timezone, list };
};



const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData(
        "weather",
        searchParams
    ).then(formatCurrentWeather);

    const { lat, lon } = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData("forecast", {
        lat,
        lon,
        units: searchParams.units,
        cnt: 10
    }).then(formatForecastWeather);

    return { ...formattedCurrentWeather, forecast: formattedForecastWeather.list };
};

const formatToLocalTime = (
    secs,
    zone,
    format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
    `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;
export { formatToLocalTime, iconUrlFromCode };
