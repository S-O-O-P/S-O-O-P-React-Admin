import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const baseImagePath = '/images/admin/';
  const baseImagePaths = '/images/commons/';

  const routes = [
    { paths: ['/home'], name: '홈', activeImg: `${baseImagePath}icon_home_white.png`, inactiveImg: `${baseImagePath}icon_home_colored.png` },
    { paths: ['/customer', '/customer/:userCode'], name: '회원관리', activeImg: `${baseImagePath}icon_user_white.png`, inactiveImg: `${baseImagePath}icon_user_main_color.png` },
    { paths: ['/inquiry', '/inquiry/:id'], name: '1:1문의', activeImg: `${baseImagePath}icon_support_white.png`, inactiveImg: `${baseImagePath}icon_support_colored.png` },
    { paths: ['/honeypot', '/honeypot/:honeypotCode'], name: '허니팟 관리', activeImg: `${baseImagePath}icon_board_white.png`, inactiveImg: `${baseImagePath}icon_board_main_color.png` },
    { paths: ['/events', '/events/:type/:id', '/events/detail/:id'], name: '공연/전시 정보', activeImg: `${baseImagePath}icon_performance_white.png`, inactiveImg: `${baseImagePath}icon_performance_colored.png` },
    { paths: ['/notice', '/notice/:id'], name: '공지사항 관리', activeImg: `${baseImagePath}icon_notice_white.png`, inactiveImg: `${baseImagePath}icon_notice_colored.png` },
  ];

  const isActive = (paths) => {
    return paths.some(path => {
      const pathRegex = new RegExp(`^${path.replace(/:\w+/g, '\\w+')}$`);
      return pathRegex.test(location.pathname);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const handleLogoClick = () => {
    navigate('/home');
  };

  return (
    <Box className="sidebar">
      <Box className="sidebar-header">
        <img src={`${baseImagePaths}logo.png`} alt="logo" className="sidebar-logo" onClick={handleLogoClick} />
        <Box className="sidebar-role-user">
          <Typography variant="body2" className="sidebar-role">관리자</Typography>
          <Typography variant="body1" className="sidebar-user">
            {user && user.nickname && user.userRole === 'ADMIN' ? `${user.nickname}님` : '로딩 중...'}
          </Typography>
        </Box>
        <Box className="sidebar-logout-container">
          <Button variant="body2" onClick={handleLogout}>
            Logout
            <img src={`${baseImagePaths}icon_logout_white.png`} alt="로그아웃" className='sidebar-logout' />
          </Button>
        </Box>
      </Box>
      <List className="sidebar-menu">
        {routes.map((route, index) => (
          <ListItem
            button
            key={index}
            component={NavLink}
            to={route.paths[0]}
            className={route.name}
            style={{
              backgroundColor: isActive(route.paths) ? '#FFB755' : '',
              color: isActive(route.paths) ? 'white' : ''
            }}
          >
            <img src={isActive(route.paths) ? route.activeImg : route.inactiveImg} alt={route.name} />
            <ListItemText primary={route.name} />
          </ListItem>
        ))}
      </List>
      <div className="vertical-line"></div>
    </Box>
  );
}

export default Sidebar;
