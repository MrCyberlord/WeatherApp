import React from "react";
import { iconUrlFromCode } from "./WeatherData";

function TodaysForecast({ items, units }) {
  const unitSymbol = units === "metric" ? "°C" : "°F";
  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="text-black font-medium uppercase px-3">Todays Forecast</p>
      </div>
      <hr className="my-2 " />

      <div className="flex flex-row items-center justify-around text-black">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center justify-center">
            <p className="font-semibold text-base">{item.time}</p>
            <img src={iconUrlFromCode(item.icon)} className="w-20" alt="" />
            <p className="font-medium">{`${item.temp.toFixed()}${unitSymbol}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodaysForecast;


