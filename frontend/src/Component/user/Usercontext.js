import React, { createContext, useReducer, useContext, useEffect } from 'react';

const UserContext = createContext();

const initialState = {
  isLoggedIn: false,
  userRole: null,
  username: null,
  userData: {},
  isLoading: false,
  error: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        userRole: action.userRole || null,
        username: action.username || null,
        userData: action.userData || {},
        isLoading: false,
        error: null,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        userRole: null,
        username: null,
        userData: {},
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

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        const { userRole, username } = parsedUserData;
        // Pass the parsedUserData to login to ensure authentication data is correctly set
        login(userRole, username, parsedUserData);
      } catch (error) {
        // Handle JSON parsing error
        console.error('Error parsing stored user data:', error);
        // Optionally, clear invalid data from localStorage
        localStorage.removeItem('userData');
      }
    }
  }, []);

  const login = (userRole, username, userData) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    dispatch({ type: 'LOGIN', userRole, username, userData });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('userData');
    localStorage.removeItem('token'); // Remove the token from localStorage
    window.location.href = '/user/login';
  };

  const setLoading = (isLoading) => {
    dispatch({ type: 'SET_LOADING', isLoading });
  };

  const setError = (error) => {
    dispatch({ type: 'SET_ERROR', error });
  };

  const isTokenValid = () => {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if token exists, false otherwise
  };

  return (
    <UserContext.Provider
      value={{ state, login, logout, setLoading, setError, isTokenValid }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};