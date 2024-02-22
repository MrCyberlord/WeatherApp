import React from "react";
import { formatToLocalTime } from "./WeatherData";

function TimeAndLocation({ weather: { dt, timezone, name, country } }) {
  return (
    <div className="flex flex-row items-center justify-center my-3 space-x-3">
      <div className="">
        <p className="text-black text-2xl">
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>

      <div className="flex items-center justify-center">
        <p className="text-black text-2xl font-medium">{`${name}, ${country}`}</p>
      </div>
    </div>
  );
}

export default TimeAndLocation;
