// useAuth.js
import { useState } from 'react';
import axios from 'axios';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (username, password) => {
    try {
      // Make a request to the backend to authenticate
      const response = await axios.post('http://localhost:5000/Staff/login', {
        stfUserName: username,
        stfPassword: password
      });

      // If login successful, set isAuthenticated to true
      setIsAuthenticated(true);
      // You might want to store token or user information here if needed
      return response;
    } catch (error) {
      // If login fails, throw an error
      throw new Error('Login failed');
    }
  };

  return {
    isAuthenticated,
    login,
  };
}
