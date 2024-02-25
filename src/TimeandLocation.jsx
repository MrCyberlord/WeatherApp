import React from "react";
import { formatToLocalTime } from "./WeatherData";

function TimeAndLocation({ weather: { dt, timezone, name, country } }) {
  return (
    <div className="flex flex-row items-center justify-center my-5 space-x-2
    sm:space-x-3 sm:my-3">
      <div className="flex items-center justify-center">
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
