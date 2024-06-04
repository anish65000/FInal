import React, { useState } from 'react';
import axios from 'axios';

import compability from '../../Assest/img/compabi.jpg'

import UserNavbar from './UserNavbar';
import UserSidebar from './Recipients/UserSidebar';

const BloodCompatibilityChecker = () => {
  const [recipientType, setRecipientType] = useState('');
  const [recipientAge, setRecipientAge] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/staff/checkCompatibility', {
        recipientType,
        recipientAge,
      });

      setResult({ compatible: response.data.compatible, donorType: response.data.donorType, donors: response.data.donors });
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <UserNavbar />
      <div className="row">
        <div className="col-md-2 p-0">
          <UserSidebar />
        </div>
        <div className="col-md-10">
          <div className="card">
            <h1 className="font-medium text-center justify-center text-primary">
              Check Blood Compatibility
            </h1>
            <br />
            <div style={{ width: '30%', margin: '0 auto' }}> {/* Adjust the width as needed */}
              <img
                src={compability}
                alt="Blood Donation"
                className="full mx-auto mb-4 w-100" 
              />
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="recipientType">Recipient Blood Type:</label>
                <select
                  id="recipientType"
                  className="form-control"
                  value={recipientType}
                  onChange={(e) => setRecipientType(e.target.value)}
                >
                  <option value="">Select Blood Type</option>
                  <option value="O-">O-</option>
                  <option value="O+">O+</option>
                  <option value="B-">B-</option>
                  <option value="B+">B+</option>
                  <option value="A-">A-</option>
                  <option value="A+">A+</option>
                  <option value="AB-">AB-</option>
                  <option value="AB+">AB+</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="recipientAge">Recipient Age:</label>
                <input
                  type="number"
                  id="recipientAge"
                  className="form-control"
                  value={recipientAge}
                  onChange={(e) => setRecipientAge(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Checking...' : 'Check Compatibility'}
              </button>
            </form>
            {error && <p className="text-danger mt-3">{error}</p>}
            {result && (
              <div className="mt-3">
                {result.compatible ? (
                  <>
                    <p className="text-success">Compatible donor(s) found:</p>
                    <ul>
                      {result.donors && result.donors.map((donor, index) => (
                        <li key={index}>{donor} ({result.donorType})</li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="text-danger">No compatible donor found.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BloodCompatibilityChecker;
