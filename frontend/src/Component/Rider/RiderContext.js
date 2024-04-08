import React, { createContext, useReducer, useContext, useEffect } from 'react';
import axios from 'axios';

const RiderContext = createContext();

const initialState = {
  isLoggedIn: false,
  riderName: null,
  bloodType: null,
  isLoading: false,
  error: null,
};

const riderReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        riderName: action.riderName || null,
        bloodType: action.bloodType || null,
        isLoading: false,
        error: null,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        riderName: null,
        bloodType: null,
        isLoading: false,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const RiderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(riderReducer, initialState);

  useEffect(() => {
    const storedRiderData = localStorage.getItem('riderData');

    if (storedRiderData) {
      try {
        const parsedRiderData = JSON.parse(storedRiderData);
        const { riderName, bloodType } = parsedRiderData;

        // Pass the parsedRiderData to login to ensure authentication data is correctly set
        login(riderName, bloodType);
      } catch (error) {
        // Handle JSON parsing error
        console.error('Error parsing stored rider data:', error);
        // Optionally, clear invalid data from localStorage
        localStorage.removeItem('riderData');
      }
    }
  }, []);

  const login = (riderName, bloodType) => {
    localStorage.setItem('riderData', JSON.stringify({ riderName, bloodType }));
    dispatch({ type: 'LOGIN', riderName, bloodType });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('riderData');
    // Optionally, redirect to login page
    // window.location.href = '/rider/login';
  };

  const setLoading = (isLoading) => {
    dispatch({ type: 'SET_LOADING', isLoading });
  };

  const setError = (error) => {
    dispatch({ type: 'SET_ERROR', error });
  };

  return (
    <RiderContext.Provider value={{ state, login, logout, setLoading, setError }}>
      {children}
    </RiderContext.Provider>
  );
};

export const useRider = () => {
  const context = useContext(RiderContext);

  if (!context) {
    throw new Error('useRider must be used within a RiderProvider');
  }

  return context;
};
