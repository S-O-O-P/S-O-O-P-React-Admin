import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
        <div className="top-bar">
          <div>
          <NavLink to='/main'>
            <img className='header-logo' src="images/commons/logo.png" alt="LOGO"/>
            </NavLink>
          </div>
          <nav>
            <ul>
              <li><NavLink to={'/cultureinfo'}>전시/공연정보</NavLink></li>
              <li><NavLink to='/honey'>허니팟</NavLink></li>
            </ul>
          </nav>
          <NavLink to='/login'>
          <button className="login-btn">LOGIN</button>
          </NavLink>
        </div>
    </header>
  );
}

export default Header;
