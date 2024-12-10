import { useState } from "react";
import { searchActivities, ActivitySearchParams, Activity } from "../services/api";

const SearchActivities = () => {
  const [query, setQuery] = useState<ActivitySearchParams>({ location: "", date: "", category: "" });
  const [results, setResults] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchActivities(query);
      setResults(data);
    } catch (err) {
      setError("Failed to fetch activities. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Search Activities</h2>
      <input
        type="text"
        placeholder="Location"
        value={query.location}
        onChange={(e) => setQuery({ ...query, location: e.target.value })}
        className="block mb-2 border px-3 py-2"
      />
      <input
        type="date"
        value={query.date}
        onChange={(e) => setQuery({ ...query, date: e.target.value })}
        className="block mb-2 border px-3 py-2"
      />
      <input
        type="text"
        placeholder="Category (Optional)"
        value={query.category}
        onChange={(e) => setQuery({ ...query, category: e.target.value })}
        className="block mb-4 border px-3 py-2"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
      >
        Search
      </button>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-6">
        {results.map((activity, idx) => (
          <div key={idx} className="p-4 border mb-2 rounded shadow">
            <p className="font-bold">{activity.name}</p>
            <p>{activity.price ? `${activity.price} USD` : "Price not available"}</p>
            <p>{activity.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchActivities;
