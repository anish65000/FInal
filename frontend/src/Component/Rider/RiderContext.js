import React, { createContext, useReducer, useContext, useEffect } from 'react';
import axios from 'axios';

const RiderContext = createContext();


const initialState = {
  isLoggedIn: false,
  riderName: null,
  riderData: {},
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
        riderData: action.riderData || {},
        isLoading: false,
        error: null,
      };
    case 'LOGOUT':
      return { ...initialState };
    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading };
    case 'SET_ERROR':
      return { ...state, error: action.error, isLoading: false };
    default:
      return state;
  }
};

export const RiderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(riderReducer, initialState);

  useEffect(() => {
    // Initialize state from local storage
    const riderName = localStorage.getItem('riderName');
    
    if (riderName ) {
      dispatch({ type: 'LOGIN', riderName });
    }
  }, []);

  const login = ( riderName, riderData) => {
    dispatch({ type: 'LOGIN', riderName, riderData });
    localStorage.setItem('riderName', riderName);
  
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    // Clear local storage upon logout
    localStorage.removeItem('riderName');
    localStorage.removeItem('token')
  };

  const setLoading = (isLoading) => {
    dispatch({ type: 'SET_LOADING', isLoading });
  };

  const setError = (error) => {
    dispatch({ type: 'SET_ERROR', error });
  };

  const checkAuth = () => {
    // Implement your authentication check here
    // For simplicity, I'm assuming the user is always authenticated when the component mounts
    dispatch({ type: 'SET_LOADING', isLoading: true });
    setTimeout(() => {
      dispatch({ type: 'SET_LOADING', isLoading: false });
    }, 1000); // Simulating async operation
  };

  return (
    <RiderContext.Provider
      value={{ state, login, logout, setLoading, setError, checkAuth }}
    >
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
