import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you have axios installed


const CampSearch = () => {
  const [district, setDistrict] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [camps, setCamps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/findCamps', {
        district,
        bloodGroup,
      });

      setCamps(response.data);
    } catch (error) {
      setError(error.message || 'An error occurred while searching for camps.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Optional: Clear camps and any potential error on component unmount
    return () => {
      setCamps([]);
      setError(null);
    };
  }, []);

  return (
    <div className="camp-search">
      <h1>Search Nearby Camps</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="district">District:</label>
          <input
            type="text"
            id="district"
            name="district"
            value={district}
            onChange={(event) => setDistrict(event.target.value)}
            required
            className="bg-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md"
          />
          <label htmlFor="bloodGroup">Blood Group:</label>
          <input
            type="text"
            id="bloodGroup"
            name="bloodGroup"
            value={bloodGroup}
            onChange={(event) => setBloodGroup(event.target.value)}
            required
            className="bg-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-md"
          />
        </div>
        <button type="submit" className="btn-primary mt-4">
          {isLoading ? 'Searching...' : 'Search Now'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {camps.length > 0 && (
        <div className="camp-results">
          <h2>Camp Results</h2>
          <ul>
            {camps.map((camp) => (
              <li key={camp.campId} className="camp-card">
                <h3>{camp.name}</h3>
                <p>Date: {camp.date}</p>
                <p>Address: {camp.address}</p>
                <p>District: {camp.district}</p>
                <p>Organizer: {camp.organizer}</p>
                <p>Contact: {camp.contact}</p>
                <p>Start Time: {camp.startTime}</p>
                <p>End Time: {camp.endTime}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CampSearch;
