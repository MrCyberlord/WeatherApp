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
    if (city !== "") setQuery({ q: city });
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
    <div className="flex flex-row justify-center py-6">

      <div className="flex flex-row space-x-4 ">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="Enter city name"
          className="text-3xl font-semibold p-2 shadow-xl  focus:outline-none rounded-2xl"
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
          className="text-[2.35rem] font-semibold text-black transition ease-out hover:scale-125 "
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
