import { useState, useEffect } from 'react';
import axios from 'axios';

const useRiderNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found in localStorage');
        }

        const response = await axios.get('http://localhost:5000/rider-notifications', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!Array.isArray(response.data)) {
          throw new Error('Invalid notifications data format');
        }

        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching rider notifications:', error);
        setError(error.message);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in localStorage');
      }

      await axios.patch(`http://localhost:5000/rider-notifications/${notificationId}/read`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
      setError(error.message);
    }
  };

  return (
    <div>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <div key={index} className={`alert alert-info ${notification.read ? 'alert-secondary' : ''}`} role="alert">
            <p>
              <strong>New Request:</strong> Rider {notification.riderId} has requested a ride to {notification.destination}
            </p>
            {!notification.read && (
              <button onClick={() => markAsRead(notification.id)} className="btn btn-sm btn-primary">
                Mark as Read
              </button>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-muted">No new notifications.</p>
      )}
    </div>
  );
};

export default useRiderNotifications;
