import React, { useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import { toast } from "react-toastify";

function Input({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleSearchClick = () => {
    if (city !== "") {
      setQuery({ q: city });
      setCity("")
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && city !== "") {
      handleSearchClick(); // Reusing the handleSearchClick logic for the Enter key press
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info("Fetching users location.");
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location fetched!");
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  return (
    <div className="flex flex-row justify-around py-3
    sm:py-4">

      <div className="flex flex-row space-x-1 px-1
      sm:space-x-4
      ">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          onKeyPress={handleKeyPress}
          type="text"
          placeholder="Enter city name"
          className="text-xs h-9 font-semibold shadow-xl  focus:outline-none rounded-2xl
          sm:text-3xl sm:h-auto"
        />
        <UilSearch
          size={40}
          className="text-black cursor-pointer transition ease-out hover:scale-125 translate-y-2"
          onClick={handleSearchClick}
        />
        <UilLocationPoint
          size={40}
          className="text-black cursor-pointer transition ease-out hover:scale-125 translate-y-2"
          onClick={handleLocationClick}
        />
         <button 
          name="metric"
          className="text-[2.35rem] font-semibold text-black transition ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          °C
        </button>
        <button
          name="imperial"
          className="text-[2.35rem] text-black font-semibold transition ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          °F
        </button>
      </div>

    </div>
  );
}

export default Input;
