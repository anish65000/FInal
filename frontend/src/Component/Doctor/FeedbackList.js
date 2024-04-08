import React, { useState, useEffect } from 'react';

const FeedbackList = ({ stfId }) => {
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:5000/api/blooddonationfeedback/${stfId}`);

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        setFeedback(data);
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (stfId) {
      fetchFeedback();
    }
  }, [stfId]);

  return (
    <div className="feedback-list">
      {isLoading ? (
        <p className="text-center">Loading feedback...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : feedback.length > 0 ? (
        <ul>
          {feedback.map((feedbackItem) => (
            <li key={feedbackItem.id} className="border-b px-4 py-2">
              <p className="text-gray-700">{feedbackItem.feedback}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No feedback found.</p>
      )}
    </div>
  );
};

export default FeedbackList;
