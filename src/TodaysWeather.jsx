import React from "react";

import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
  UilTemperatureMinus,
  UilTemperaturePlus 
} from "@iconscout/react-unicons";

import { formatToLocalTime, iconUrlFromCode } from "./WeatherData";

function TodaysWeather({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    timezone,
  },
}) {

  
  return (
    <div>

      <div className="flex flex-row px-1 text-[1.1rem] text-black justify-around
      sm:px-5 sm:text-2xl">

        <div className="flex flex-row items-center justify-center">
          <p>{details}</p>
          <img src={iconUrlFromCode(icon)} alt="" className="w-12
          sm:w-20" />
        </div>
       
        <div className="flex flex-row items-center justify-center">
          <UilTemperature size={25} className="mr-0
          sm:mr-1" />
          <p >Temp: {`${temp.toFixed()}°`}</p>
        </div>

        <div className="flex items-center justify-center">
          <UilTear size={25} className="mr-1" />
          <span className="">Humidity: {`${humidity.toFixed()}%`}</span>
        </div>

        <div className="flex items-center justify-center">
          <UilWind size={25} className="mr-1" />
          <span className="">Wind: {`${speed.toFixed()} km/h`}</span>
        </div>

      </div>


      <div className="flex flex-row font-medium items-center justify-center space-x-1 text-black text-[1.1rem] py-5 px-1
      sm:text-2xl sm:space-x-3 sm:py-1">
        <UilSun />
        <p>
          Rise:{" "}
          <span className="ml-1">
            {formatToLocalTime(sunrise, timezone, "hh:mm a")}
          </span>
        </p>
        <p>|</p>

        <UilSunset />
        <p>
          Set:{" "}
          <span className="ml-1">
            {formatToLocalTime(sunset, timezone, "hh:mm a")}
          </span>
        </p>
        <p>|</p>

        <UilTemperaturePlus />
        <p>
          High:{" "}
          <span className="ml-1">{`${temp_max.toFixed()}°`}</span>
        </p>
        <p>|</p>

        <UilTemperatureMinus/>
        <p >
          Low:{" "}
          <span className="ml-1">{`${temp_min.toFixed()}°`}</span>
        </p>
      </div>
    </div>
  );
}

export default TodaysWeather;
