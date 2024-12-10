import React, { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { searchHotels, HotelSearchParams } from "../../services/api";
import { HotelItem } from "../../types/Hotel";
import SearchLayout from "../SearchLayout";
import HotelFilters from "../../components/HotelFilterProps";
import SearchHotelCard from "../../components/search_cards/SearchHotelCards";
import HotelLists from "./HotelLists";
import HotelDetails from "./HotelDetails";

const SearchHotels = () => {
  const [query, setQuery] = useState<HotelSearchParams>({
    query: "",
    destination: "",
    arrival_date: "",
    departure_date: "",
    guests: 1,
  });

  const [results, setResults] = useState<HotelItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.query || !query.arrival_date || !query.departure_date || query.guests < 1) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await searchHotels({query});
      setResults(data);

      // navigateTo("lists", { state: { query, results: data } });
    } catch (err) {
      setError("Failed to fetch hotels. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchLayout
      filters={
        <>
          <HotelFilters query={query} setQuery={setQuery} />
          <button
            onClick={handleSearch}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-4"
          >
            Search
          </button>
        </>
      }
    >
      
      <Routes>
        <Route
          path="/"
          element={
            <div>
             
              <Outlet />
            </div>
          }
        >
          <Route
            index
            element={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {results.map((hotel, idx) => (
                  <SearchHotelCard key={idx} hotel={hotel} query={query} />
                ))}
              </div>
            }
          />
          <Route path="all" element={<HotelLists />} />
          <Route path="details/:hotelId" element={<HotelDetails />} />
        </Route>
      </Routes>
    </SearchLayout>
  );
};

export default SearchHotels;
