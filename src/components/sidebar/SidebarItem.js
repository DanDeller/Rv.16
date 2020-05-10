import React, { useState } from 'react';
import style from '../../assets/styles/style.less';
import PropTypes from 'prop-types';

const SidebarItem = (props) => {
  const city = props.recentCity;
  
  const [recentCity, toggleCity] = useState({
    toggleDelete: false
  });

  const toggle = () => {
    toggleCity({
      toggleDelete: !recentCity.toggleDelete
    })
  }
  
  return (
    <li
      className={style.sidebarItem}
      onClick={() => toggle()}>
      <p
        style={{
          transform: !recentCity.toggleDelete ? 'translateY(0)' : 'translateX(-5vh)',
          opacity: !recentCity.toggleDelete ? '1' : '.4'
        }}>
        {city.city}
      </p>
      <button
        style={{
          display: recentCity.toggleDelete ? 'flex' : 'none'
        }}>Remove
      </button>  
    </li>
  );
}

SidebarItem.propTypes = {
  city: PropTypes.object,
  recentCity: PropTypes.object
};

export default SidebarItem;