/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface HotelFiltersProps {
  query: any;
  setQuery: React.Dispatch<React.SetStateAction<any>>;
}

const HotelFilters = ({ query, setQuery }: HotelFiltersProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Destination</label>
        <input
          type="text"
          placeholder="Enter destination"
          value={query.query}
          onChange={(e) => setQuery({ ...query, query: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Arrival Date</label>
        <input
          type="date"
          value={query.arrival_date}
          onChange={(e) => setQuery({ ...query, arrival_date: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Departure Date</label>
        <input
          type="date"
          value={query.departure_date}
          onChange={(e) => setQuery({ ...query, departure_date: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Guests</label>
        <input
          type="number"
          value={query.guests}
          onChange={(e) => setQuery({ ...query, guests: Number(e.target.value) })}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
    </div>
  );
};

export default HotelFilters;
