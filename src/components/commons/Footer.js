import React from 'react';
import './Footer.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Footer() {
  const [isHovering, setIsHovering] = useState(false);
  const [isHovering2, setIsHovering2] = useState(false);
  const [isHovering3, setIsHovering3] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOver2 = () => {
    setIsHovering2(true);
  };
  const handleMouseOver3 = () => {
    setIsHovering3(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const handleMouseOut2 = () => {
    setIsHovering2(false);
  };
  const handleMouseOut3 = () => {
    setIsHovering3(false);
  };

  return (
    <footer>
        <div class="footer-content">
          <div>
          <NavLink to='/main'>
            <img class="footer-logo" src="images/commons/logo_white.png" alt="LOGO"
            href='/main'/>
            </NavLink>
          </div>
          <div class="footer-links">
            <div className='test'>
            <NavLink to='/main'>
            <a>About us</a>
            </NavLink>
            <NavLink to='/help'>
            <a>고객센터</a>
            </NavLink>
            <NavLink to='/main'>
            <a>공지사항</a>
            </NavLink>
            <NavLink to='/main'>
            <a>개인정보처리방침</a>
            </NavLink>
            <NavLink to='/main'>
            <a>이용약관</a>
            </NavLink>
            </div>
            <p class="text2">©2024 SOOP. ALL RIGHTS RESERVED.</p>
          </div>
          <div className='footer-icons'>
          <a href='http://www.facebook.com'>
          <img onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className={"footer-facebook"} 
          src={isHovering?'images/commons/icon_facebook_colored.png':'images/commons/icon_facebook_colorwhite.png'}/>
          </a>

          <a href='http://www.instagram.com'>
          <img  onMouseOver={handleMouseOver2} onMouseOut={handleMouseOut2} className={"footer-insta"} 
          src={isHovering2?'images/commons/icon_insta_colored.png':'images/commons/icon_insta_colorwhite.png'}/></a>

          <a href='https://x.com'>
          <img onMouseOver={handleMouseOver3} onMouseOut={handleMouseOut3} className={"footer-twitter"} 
          src={isHovering3?'images/commons/icon_twitter_colored.png':'images/commons/icon_twitter_colorwhite.png'}/>
          </a>

          </div>
        </div>
    </footer>
  );
}

export default Footer;
