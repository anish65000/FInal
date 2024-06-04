import React, { useState, useEffect } from 'react';

const Notifications = () => {
    const [donorNotifications, setDonorNotifications] = useState([]);
    const [urgentRequest, setUrgentRequest] = useState({});
    const [donationStatus, setDonationStatus] = useState('');
    const [bloodDonationSlot, setBloodDonationSlot] = useState('');
    const [confirmedAppointment, setConfirmedAppointment] = useState(''); 

  useEffect(() => {
    const fetchDonorNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found in localStorage');
        }

        const response = await fetch('http://localhost:5000/donor-notifications', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch donor notifications');
        }

        const data = await response.json();
        setDonorNotifications(data);
      } catch (error) {
        console.error('Error fetching donor notifications:', error);
      }
    };

    const fetchUrgentRequest = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found in localStorage');
        }

        const response = await fetch('http://localhost:5000/urgentrequest', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch urgent request');
        }

        const data = await response.json();
        setUrgentRequest(data);
      } catch (error) {
        console.error('Error fetching urgent request:', error);
      }
    };

    const fetchDonationStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found in localStorage');
        }

        const response = await fetch('http://localhost:5000/donation/status', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch donation status');
        }

        const data = await response.json();
        setDonationStatus(data.status);
      } catch (error) {
        console.error('Error fetching donation status:', error);
      }
    };
   
    const fetchConfirmedAppointment = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('Token not found in localStorage');
          }
  
          const response = await fetch('http://localhost:5000/confirmed-appointments', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
  
          if (!response.ok) {
            throw new Error('Failed to fetch confirmed appointment');
          }
  
          const data = await response.json();
          setConfirmedAppointment(data.slot_time);
        } catch (error) {
          console.error('Error fetching confirmed appointment:', error);
        }
      };
  
      fetchConfirmedAppointment();

  

    fetchDonorNotifications();
    fetchUrgentRequest();
    fetchDonationStatus();

  }, []);

  return (
    <div>
      {/* Donor Notifications */}
      <div>
        {donorNotifications.length > 0 ? (
          donorNotifications.map((notification, index) => (
            <div key={index} className="alert alert-info" role="alert">
              <p>
                <strong style={{ color: '#e74c3c' }}>New blood request from:</strong> you have a donor message <span style={{ color: '#2980b9' }}>{notification.message}</span> from {notification.recipient_name}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No new  notifications.</p>
        )}
      </div>

      {/* Urgent Request */}
      {urgentRequest.message && (
        <div className="alert alert-warning" role="alert">
          <p>
            <strong style={{ color: '#e74c3c' }}>Urgent Request:</strong> {urgentRequest.message} from {urgentRequest.Recipent_name}
          </p>
        </div>
      )}

      {/* Donation Status */}
      {donationStatus && (
        <div className="alert alert-success" role="alert">
          <p>
            <strong style={{ color: '#e74c3c' }}>Donation Status:</strong> {donationStatus}
          </p>
        </div>
      )}

    

{confirmedAppointment && (
        <div className="alert alert-secondary" role="alert">
          <p>
            <strong style={{ color: '#e74c3c' }}>Confirmed Appointment:</strong> Your appointment has been confirmed for {confirmedAppointment}.
          </p>
        </div>
      )}


      {/* Fallback */}
      {(donorNotifications.length === 0 && !urgentRequest.message && !donationStatus) && (
        <p className="text-center text-muted">No new notifications.</p>
      )}
    </div>
  );
};

export default Notifications;
