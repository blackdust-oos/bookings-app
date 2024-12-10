import React from "react";
import { fetchHotelDetails, HotelSearchParams } from "../../services/api";
import { HotelItem } from "../../types/Hotel";
import { useNavigate } from "react-router-dom";


interface SearchHotelCardProps {
  hotel: HotelItem;
  query: HotelSearchParams;
}


const SearchHotelCard= ({ hotel, query } : SearchHotelCardProps) => {
  
const navigatTo = useNavigate()
  const handleViewHotels = async () => {
    try {
      const data = await fetchHotelDetails(hotel.dest_id, hotel.search_type, query);
      console.log("Fetched Hotel Details:", data);
      navigatTo('all' , { state: { query, results: data.data.hotels } })
      // alert("Hotel details fetched. Check the console for data.");

    } catch (error) {
      alert("Failed to fetch hotel details. Please try again.");
      console.error("Error fetching hotel details:", error);
    }
  };

  return (
    <div className="flex items-center bg-white shadow-md rounded-lg p-4 relative">
      <div className="w-40 h-40 mr-4 rounded overflow-hidden">
        <img
          src={hotel.image_url}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col w-full">
        <div className="font-semibold text-lg">{hotel.name}</div>
        <div className="text-sm text-gray-500">{hotel.label}</div>
        <div className="text-sm text-gray-500">{hotel.country}</div>
        <div className="text-sm text-gray-500">
          Number of Hotels: {hotel.nr_hotels}
        </div>

        <button
          onClick={handleViewHotels}
          className="mt-2 bg-customBlue1 text-customBlue px-4 py-2 rounded hover:bg-customBlue hover:text-white"
        >
          View Hotels
        </button>
      </div>
    </div>
  );
};

export default SearchHotelCard;
