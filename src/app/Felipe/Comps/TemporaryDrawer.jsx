import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import MenuIcon from '@mui/icons-material/Menu';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import '../Home.css'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Link } from 'react-router-dom';

export function TemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const links = [
    { text: 'Ver Ramas', path: '/home', icon: <LibraryBooksIcon /> },
    { text: 'Ver Horario', path: '/home', icon: <CalendarMonthIcon /> },
    { text: 'Pedir Recinto Deportivo', path: '/pedir-espacio', icon: <SportsBasketballIcon /> },
    { text: 'Solicitar Recursos', path: '/home', icon: <SportsCricketIcon /> },
    { text: 'Ver Ramas Inscritas', path: '/ver-ramas-inscritas', icon: <CalendarMonthIcon /> },
  ];
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
       <List>
        {links.map((link, index) => (
          <ListItem key={link.text} disablePadding>
            <ListItemButton component={Link} to={link.path}>
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText primary={link.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon className='menu' style={{color: 'white'}}/>
          </Button>
          <Drawer 
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
export default TemporaryDrawer;