import React from 'react';
import PropTypes from 'prop-types';

const Burger = ({isOpen, toggleOpen}) => {
  return (
    <div
      className={`navIcon ${isOpen ? 'open' : ''}`} 
      onClick={() => toggleOpen(!isOpen)}>
      <div>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

Burger.propTypes = {
  isOpen: PropTypes.bool,
  toggleOpen: PropTypes.func
}

export default Burger;