/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getHotelDetails, Hotel, HotelSearchParams } from "../../services/api";

const HotelDetails = () => {
  const [hotelDetails, setHotelDetails] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const state = location.state as {
    hotelId: number;
    query: HotelSearchParams;
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getHotelDetails(state.hotelId, state.query);
        setHotelDetails(data);
        console.log(data)
      } catch (err) {
        setError("Failed to load hotel details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (state?.hotelId) {
      fetchDetails();
    } else {
      setError("No hotel ID provided.");
      setLoading(false);
    }
  }, [state?.hotelId, state?.query]);

  if (loading) return <p className="text-center text-lg font-medium">Loading...</p>;
  if (error) return <p className="text-center text-red-500 text-lg font-medium">{error}</p>;
  if (!hotelDetails) return <p className="text-center text-gray-500 text-lg">No details available.</p>;

  const {
    hotel_name,
    url,
    address,
    district,
    city,
    country_trans,
    arrival_date,
    departure_date,
    property,
    product_price_breakdown,
    property_highlight_strip,
    facilities_block,
    price_transparency_mode,
  } = hotelDetails;

  const handleAddToIteration = () => {
    alert(`Hotel "${hotel_name}" added to iteration!`);
  };

  return (
    <div className="hotel-details p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{hotel_name || "Hotel Name Not Available"}</h1>
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline hover:text-blue-700"
        >
          Visit Booking Page
        </a>
      )}
      <p className="text-gray-700 mt-2">
        {address || "Address Not Available"}, {district || "District Not Available"}, {city || "City Not Available"}, {country_trans || "Country Not Available"}
      </p>

      <div className="dates mt-4">
        <p><strong>Check-in:</strong> {arrival_date || "N/A"}</p>
        <p><strong>Check-out:</strong> {departure_date || "N/A"}</p>
      </div>

      <div className="review-details mt-6">
        <h2 className="text-2xl font-semibold">Reviews</h2>
        <p><strong>Review Score:</strong> {property?.reviewScore || "N/A"} / 10</p>
        <p><strong>Review Count:</strong> {property?.reviewCount || "N/A"}</p>
        <p><strong>Class:</strong> {property?.qualityClass || "N/A"} stars</p>
      </div>

      <div className="price-details mt-6">
        <h2 className="text-2xl font-semibold">Price Details</h2>
        <p><strong>Total Price (USD):</strong> {product_price_breakdown?.all_inclusive_amount?.amount_rounded || "N/A"}</p>
        <p><strong>Taxes (USD):</strong> {product_price_breakdown?.included_taxes_and_charges_amount?.amount_rounded || "N/A"}</p>
      </div>

      <div className="highlights mt-6">
        <h2 className="text-2xl font-semibold">Property Highlights</h2>
        <ul className="list-disc list-inside">
          {property_highlight_strip?.map((highlight : any, index: number) => (
            <li key={index} className="mt-1">
              {highlight.icon_list?.[0]?.icon && (
                <img
                  src={`path/to/icons/${highlight.icon_list[0].icon}.png`}
                  alt={highlight.name || "Highlight"}
                  className="inline-block w-5 h-5 mr-2"
                />
              )}
              {highlight.name || "Highlight Not Available"}
            </li>
          ))}
        </ul>
      </div>

      <div className="facilities mt-6">
        <h2 className="text-2xl font-semibold">{facilities_block?.name || "Facilities"}</h2>
        <ul className="list-disc list-inside">
          {facilities_block?.facilities?.map((facility: any, index: number) => (
            <li key={index} className="mt-1">
              {facility.icon && (
                <img
                  src={`path/to/icons/${facility.icon}.png`}
                  alt={facility.name || "Facility"}
                  className="inline-block w-5 h-5 mr-2"
                />
              )}
              {facility.name || "Facility Not Available"}
            </li>
          ))}
        </ul>
      </div>

      <div className="additional-info mt-6">
        <p><strong>Price Transparency Mode:</strong> {price_transparency_mode || "N/A"}</p>
      </div>

      <button
        onClick={handleAddToIteration}
        className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Add to Iteration
      </button>
    </div>
  );
};

export default HotelDetails;
