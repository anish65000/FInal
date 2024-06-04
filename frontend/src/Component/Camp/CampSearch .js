import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserNavbar from '../user/UserNavbar';
import UserSidebar from '../user/Recipients/UserSidebar';


  

const districtsNepal = [
  'Achham',
  'Arghakhanchi',
  'Baglung',
  'Baitadi',
  'Bajhang',
  'Bajura',
  'Banke',
  'Bara',
  'Bardiya',
  'Bhaktapur',
  'Bhojpur',
  'Chitwan',
  'Dadeldhura',
  'Dailekh',
  'Dang',
  'Darchula',
  'Dhading',
  'Dhankuta',
  'Dhanusha',
  'Dolakha',
  'Dolpa',
  'Doti',
  'Gorkha',
  'Gulmi',
  'Humla',
  'Ilam',
  'Jajarkot',
  'Jhapa',
  'Jumla',
  'Kailali',
  'Kalikot',
  'Kanchanpur',
  'Kapilvastu',
  'Kaski',
  'Kathmandu',
  'Kavrepalanchok',
  'Khotang',
  'Lalitpur',
  'Lamjung',
  'Mahottari',
  'Makwanpur',
  'Manang',
  'Morang',
  'Mugu',
  'Mustang',
  'Myagdi',
  'Nawalparasi',
  'Nuwakot',
  'Okhaldhunga',
  'Palpa',
  'Panchthar',
  'Parbat',
  'Parsa',
  'Pyuthan',
  'Ramechhap',
  'Rasuwa',
  'Rautahat',
  'Rolpa',
  'Rukum',
  'Rupandehi',
  'Salyan',
  'Sankhuwasabha',
  'Saptari',
  'Sarlahi',
  'Sindhuli',
  'Sindhupalchok',
  'Siraha',
  'Solukhumbu',
  'Sunsari',
  'Surkhet',
  'Syangja',
  'Tanahu',
  'Taplejung',
  'Terhathum',
  'Udayapur'
];


const CampSearch = () => {
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');
  const [camps, setCamps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/searchCamps', {
        address,
        district,
      });
      
      if (response.data && response.data.length > 0) {
        setCamps(response.data);
      } else {
        setCamps([]);
        setError('No blood donation camps found with the provided criteria.');
      }
    } catch (error) {
      setError(error.message || 'An error occurred while searching for camps.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setAddress('');
    setDistrict('');
    setCamps([]);
    setError(null);
  };
 

  useEffect(() => {
    return () => {
      setCamps([]);
      setError(null);
    };
  }, []);
  
  return (
    <div className="">
  
<div className="home bg-pro-white flex flex-col flex-grow ">
<UserSidebar/>
<div className="flex flex-col flex-grow">
<UserNavbar/>
<div className="container mx-auto p-4">
<div className="flex items-center justify-between mb-4"></div>
    
    <div className="camp-search p-4">
      <h1 className="text-2xl font-bold mb-4">Find Camps</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <input
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          className="p-2 border rounded focus:outline-none"
        />
        <select
          value={district}
          onChange={(event) => setDistrict(event.target.value)}
          className="p-2 border rounded focus:outline-none"
        >
          <option value="">Select district</option>
          {districtsNepal.map((districtName, index) => (
            <option key={index} value={districtName}>
              {districtName}
            </option>
          ))}
        </select>
        <div className="flex justify-between">
          <button
            type="submit"
            className={`p-2 font-bold rounded ${
              isLoading ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="p-2 font-bold rounded bg-gray-500 text-white hover:bg-gray-700"
          >
            Clear
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {camps.length > 0 && (
        <div className="camp-results mt-4">
          <h2 className="text-xl font-bold mb-2">Results</h2>
          <ul className="list-none">
            {camps.map((camp) => (
              <li key={camp.campId} className="camp-card mb-4 p-4 bg-gray-100 rounded">
                <h3 className="camp-name text-lg font-bold">{camp.name}</h3>
                <p>
                  <strong>Date:</strong> {camp.date}
                </p>
                <p>
                  <strong>Address:</strong> {camp.address}
                </p>
                <p>
                  <strong>District:</strong> {camp.district}
                </p>
                <p>
                  <strong>Organizer:</strong> {camp.organizer}
                </p>
                <p>
                  <strong>Contact:</strong> {camp.contact}
                </p>
                <p>
                  <strong>Start Time:</strong> {camp.startTime}
                </p>
                <p>
                  <strong>End Time:</strong> {camp.endTime}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>
    </div>
    </div>
    </div>
    
  );
};

export default CampSearch;