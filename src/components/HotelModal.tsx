/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { fetchHotelDetails } from "../services/api";

interface ModalProps {
  hotel: any;
  onClose: () => void;
  onSave: (updatedHotel: any) => void;
}

const HotelModal = ({ hotel, onClose, onSave }: ModalProps) => {
  const [additionalData, setAdditionalData] = useState({
    dest_id: hotel.dest_id || "",
    search_type: hotel.search_type || "",
    region: hotel.region || "",
    dest_type: hotel.dest_type || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchHotelDetails(additionalData.dest_id, additionalData.search_type, {
        adults: 1,
        children_age: "0,17",
        room_qty: 1,
        page_number: 1,
        units: "metric",
        temperature_unit: "c",
      });
      setAdditionalData((prev) => ({
        ...prev,
        region: data.region || "",
        dest_type: data.dest_type || "",
      }));
    } catch (err) {
      setError("Failed to fetch additional data.");
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setAdditionalData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const updatedHotel = { ...hotel, ...additionalData };
    onSave(updatedHotel);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Hotel Information</h2>

        {loading && <p>Loading additional details...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="mb-4">
          <strong>Name:</strong> {hotel.name || "N/A"}
        </div>
        <div className="mb-4">
          <strong>Label:</strong> {hotel.label || "N/A"}
        </div>
        <div className="mb-4">
          <strong>Country:</strong> {hotel.country || "N/A"}
        </div>
        <div className="mb-4">
          <strong>Latitude:</strong> {hotel.latitude || "N/A"}
        </div>
        <div className="mb-4">
          <strong>Longitude:</strong> {hotel.longitude || "N/A"}
        </div>

        {/* Input for missing fields */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Search Type</label>
          <input
            type="text"
            value={additionalData.search_type}
            onChange={(e) => handleChange("search_type", e.target.value)}
            placeholder="Enter search type"
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        <button
          onClick={fetchData}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Fetch Additional Data
        </button>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelModal;
