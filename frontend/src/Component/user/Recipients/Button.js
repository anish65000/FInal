import React from 'react';

const Button = ({ children, variant, onClick }) => {
  const buttonStyles = {
    // Add your button styles here based on the variant
    backgroundColor: variant === 'primary' ? '#3498db' : '#2ecc71',
    color: '#ffffff',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <button style={buttonStyles} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
