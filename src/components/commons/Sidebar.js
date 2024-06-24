import React from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';


function Sidebar() {
  const location = useLocation();

  const baseImagePath = 'images/admin/';
  const baseImagePaths = 'images/commons/'


  const routes = [
    { paths: ['/home'], name: '홈', activeImg: `${baseImagePath}icon_home_white.png`, inactiveImg: `${baseImagePath}icon_home_colored.png` },
    { paths: ['/customer', '/customer/:id'], name: '회원관리', activeImg: `${baseImagePath}icon_user_white.png`, inactiveImg: `${baseImagePath}icon_user_main_color.png` },
    { paths: ['/honeypot'], name: '허니팟 관리', activeImg: `${baseImagePath}icon_board_white.png`, inactiveImg: `${baseImagePath}icon_board_main_color.png` },
    { paths: ['/events'], name: '공연/전시 정보', activeImg: `${baseImagePath}icon_performance_white.png`, inactiveImg: `${baseImagePath}icon_performance_colored.png` },
    { paths: ['/notice'], name: '공지사항 관리', activeImg: `${baseImagePath}icon_notice_white.png`, inactiveImg: `${baseImagePath}icon_notice_colored.png` },
    { paths: ['/inquiry'], name: '1:1문의', activeImg: `${baseImagePath}icon_support_white.png`, inactiveImg: `${baseImagePath}icon_support_colored.png` }
  ];

  const isActive = (paths) => {
    return paths.some(path => location.pathname.startsWith(path));
  };

  return (
    <Box className="sidebar">
      <Box className="sidebar-header">
        <img src={`${baseImagePaths}logo.png`} alt="logo" className="sidebar-logo" />
        <Box className="sidebar-role-user">
          <Typography variant="body2" className="sidebar-role">관리자</Typography>
          <Typography variant="body1" className="sidebar-user">김진용님</Typography>
        </Box>
        <Box className="sidebar-logout-container">
          <Button variant="body2">
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
            style={({ isActive: navLinkIsActive }) => ({
              backgroundColor: navLinkIsActive ? '#FFB755' : '',
              color: navLinkIsActive ? 'white' : ''
            })}
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
