import React, { createContext, useReducer, useContext, useEffect } from 'react';

const StaffContext = createContext();

const initialState = {
  isLoggedIn: false,
  stfStaffType: null,
  stfUserName: null,
  staffData: {},
  isLoading: false,
  error: null,
};

const staffReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        stfStaffType: action.stfStaffType || null,
        stfUserName: action.stfUserName || null,
        staffData: action.staffData || {},
        isLoading: false,
        error: null,
      };
    case 'LOGOUT':
      return {
        ...initialState, // Reset to initial state upon logout
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

export const StaffProvider = ({ children }) => {
  const [state, dispatch] = useReducer(staffReducer, initialState);

  useEffect(() => {
    // Initialize state from local storage
    const token = localStorage.getItem('token');
    const staffName = localStorage.getItem('staffName');
    const stfStaffType = localStorage.getItem('stfStaffType');

    if (token && staffName && stfStaffType) {
      dispatch({ type: 'LOGIN', stfStaffType, stfUserName: staffName });
    }
  }, []);

  const login = (stfStaffType, stfUserName, staffData) => {
    dispatch({ type: 'LOGIN', stfStaffType, stfUserName, staffData });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    // Clear local storage upon logout
    localStorage.removeItem('token');
    localStorage.removeItem('staffName');
    localStorage.removeItem('stfStaffType');
  };

  const setLoading = (isLoading) => {
    dispatch({ type: 'SET_LOADING', isLoading });
  };

  const setError = (error) => {
    dispatch({ type: 'SET_ERROR', error });
  };

  return (
    <StaffContext.Provider value={{ state, login, logout, setLoading, setError }}>
      {children}
    </StaffContext.Provider>
  );
};

export const useStaff = () => {
  const context = useContext(StaffContext);

  if (!context) {
    throw new Error('useStaff must be used within a StaffProvider');
  }

  return context;
};
