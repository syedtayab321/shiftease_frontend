import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AdsIcon from '@mui/icons-material/Campaign';
import PaymentIcon from '@mui/icons-material/Payment';
import HelpIcon from '@mui/icons-material/Help';
import MessageIcon from '@mui/icons-material/Message';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Sidebar({ onselect }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(false);
    localStorage.clear();
    navigate('/admin');
  };

  return (
    <>
      {/* Hamburger Icon */}
      <IconButton onClick={toggleDrawer} sx={{ position: 'absolute', top: 16, left: 16 }}>
        <MenuIcon />
      </IconButton>

      {/* Sidebar Drawer */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        <div style={{ width: 250 }}>
          <List>
            <ListItem>
              <h4>ShiftEase</h4>
            </ListItem>
            <ListItem button onClick={() => onselect('manage_providers')}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={() => onselect('manage_users')}>
              <ListItemIcon><PeopleIcon /></ListItemIcon>
              <ListItemText primary="Manage Users" />
            </ListItem>
            <ListItem button onClick={() => onselect('manage_ad_requests')}>
              <ListItemIcon><AdsIcon /></ListItemIcon>
              <ListItemText primary="View Ads Requests" />
            </ListItem>
            <ListItem button onClick={() => onselect('manage_providers')}>
              <ListItemIcon><PeopleIcon /></ListItemIcon>
              <ListItemText primary="Manage Service Providers" />
            </ListItem>
            <ListItem button onClick={() => onselect('manage_payments')}>
              <ListItemIcon><PaymentIcon /></ListItemIcon>
              <ListItemText primary="Manage Payments" />
            </ListItem>
            <ListItem button onClick={() => onselect('manage_requests')}>
              <ListItemIcon><HelpIcon /></ListItemIcon>
              <ListItemText primary="Manage Help Requests" />
            </ListItem>
            <ListItem button onClick={() => onselect('manage_messages')}>
              <ListItemIcon><MessageIcon /></ListItemIcon>
              <ListItemText primary="Messages" />
            </ListItem>
            <ListItem button onClick={() => setIsLogoutModalOpen(true)}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </div>
      </Drawer>

      {/* Logout Confirmation Modal */}
      <Dialog open={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsLogoutModalOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleLogoutClick} color="error">Logout</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
