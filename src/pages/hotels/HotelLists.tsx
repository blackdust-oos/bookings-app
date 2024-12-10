import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HotelSearchParams } from "../../services/api";

interface PriceBreakdown {
  grossPrice: { value: number; currency: string };
  strikethroughPrice?: { value: number; currency: string };
  excludedPrice: { value: number; currency: string };
}

interface Property {
  name: string;
  latitude: number;
  longitude: number;
  reviewScore: number;
  reviewScoreWord: string;
  reviewCount: number;
  checkinDate: string;
  checkoutDate: string;
  priceBreakdown: PriceBreakdown;
  photoUrls: string[];
  currency: string;
  qualityClass: number;
  wishlistName: string;
}

interface Hotel {
  hotel_id: number;
  accessibilityLabel: string;
  property: Property;
}

interface HotelCardProps {
  hotel: Hotel;
  query: HotelSearchParams;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, query }) => {
  const {
    name,
    reviewScore,
    reviewScoreWord,
    reviewCount,
    checkinDate,
    checkoutDate,
    priceBreakdown,
    photoUrls,
    qualityClass,
    wishlistName,
  } = hotel.property;

  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Hotel[]>(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  const formatPrice = (price: number, currency: string) => `${currency} ${price.toFixed(2)}`;

  const handleFetchInfo = () => {
    navigate(`/hotels/details/${hotel.hotel_id}`, { state: { hotelId: hotel.hotel_id, query } });
  };

  const handleAddToFavorites = () => {
    const updatedFavorites = [...favorites, hotel];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    alert(`${name} added to favorites!`);
  };

  return (
    <div className="border bg-white rounded-lg shadow-md p-4 m-4 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
      <div>
        <div className="relative">
          <img
            src={photoUrls[0]}
            alt={name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <button
            onClick={handleAddToFavorites}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
          >
            <span className="material-icons">favorite</span>
          </button>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">{name}</h3>
          <p className="text-sm text-gray-600 mb-1">
            <strong>{reviewScoreWord}</strong> ({reviewScore} / 10) - {reviewCount} reviews
          </p>
          <p className="text-sm text-gray-600 mb-1">Class: {qualityClass} stars</p>
          <p className="text-sm text-gray-600 mb-1">Wishlist: {wishlistName}</p>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <p>
              <strong>Check-in:</strong> {new Date(checkinDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Check-out:</strong> {new Date(checkoutDate).toLocaleDateString()}
            </p>
          </div>
          <p className="text-sm text-gray-800 font-semibold">
            Price: {formatPrice(priceBreakdown.grossPrice.value, priceBreakdown.grossPrice.currency)}
          </p>
          {priceBreakdown.strikethroughPrice && (
            <p className="text-sm text-gray-500 line-through">
              Original: {formatPrice(priceBreakdown.strikethroughPrice.value, priceBreakdown.strikethroughPrice.currency)}
            </p>
          )}
        </div>
      </div>
      <button
        className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={handleFetchInfo}
      >
        Get Details
      </button>
    </div>
  );
};

const HotelLists: React.FC<{ hotels?: Hotel[] }> = () => {
  const location = useLocation();
  const state = location.state as {
    query: HotelSearchParams;
    results: Hotel[];
  };

  if (!state) {
    return <p>No data available. Please perform a search first.</p>;
  }

  const { results } = state;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
      {results.map((hotel) => (
        <HotelCard key={hotel.hotel_id} hotel={hotel} query={state.query} />
      ))}
    </div>
  );
};

export default HotelLists;
