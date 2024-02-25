import React from "react";
import { formatToLocalTime } from "./WeatherData";

function TimeAndLocation({ weather: { dt, timezone, name, country } }) {
  return (
    <div className="flex flex-col items-center justify-center my-3 space-x-2
    sm:space-x-3 sm:my-3 sm:flex-row" >
      <div className="flex items-center justify-center pb-3
      sm:pb-0">
        <p className="text-black text-lg font-bold
        sm:text-3xl">{`${name}, ${country}`}</p>
      </div>

      <div >
        <p className="text-black text-lg
        sm:text-3xl">
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>

      
    </div>
  );
}

export default TimeAndLocation;
