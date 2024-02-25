// MultiDayForecast.js
import React from "react";
import { iconUrlFromCode } from "./WeatherData";

function MultiDayForecast({ items, units }) {
    const unitSymbol = units === "metric" ? "°C" : "°F";
  return (
    <div className="mt-4">
      <div className="flex items-center justify-start">
        <p className="text-black font-medium uppercase px-3">4-Day Forecast</p>
      </div>
      <hr className="my-2" />
      <div className="flex flex-row items-center justify-evenly text-black">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center justify-center text-black">
            <p className="font-semibold text-base">{item.day}</p>
            <p className="font-normal text-sm">{item.date}</p>
            <img src={iconUrlFromCode(item.icon)} className="w-16" alt="Weather Icon" />
            <p className="font-medium">{`${item.temp.toFixed()}${unitSymbol}`}</p>
            <p className="font-light">{item.main}</p> 
          </div>
        ))}
      </div>
    </div>
  );
}

export default MultiDayForecast;
