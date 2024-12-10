import React, { useState } from "react";
import { searchFlights, Flight, FlightSearchParams } from "../services/api";

const SearchFlights = () => {
  const [query, setQuery] = useState<FlightSearchParams>({ departure: "", destination: "", date: "" });
  const [results, setResults] = useState<Flight[]>([]);

  const handleSearch = async () => {
    try {
      const data = await searchFlights(query);
      setResults(data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Search Flights</h2>
      <input
        type="text"
        placeholder="Departure"
        value={query.departure}
        onChange={(e) => setQuery({ ...query, departure: e.target.value })}
        className="block mb-2 border px-2 py-1"
      />
      <input
        type="text"
        placeholder="Destination"
        value={query.destination}
        onChange={(e) => setQuery({ ...query, destination: e.target.value })}
        className="block mb-2 border px-2 py-1"
      />
      <input
        type="date"
        value={query.date}
        onChange={(e) => setQuery({ ...query, date: e.target.value })}
        className="block mb-4 border px-2 py-1"
      />
      <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded">
        Search
      </button>
      <div className="mt-6">
        {results.map((flight, idx) => (
          <div key={idx} className="p-4 border-b">
            <p>{flight.airline}</p>
            <p>{flight.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchFlights;
