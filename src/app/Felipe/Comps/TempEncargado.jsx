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
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import RequestPageOutlinedIcon from '@mui/icons-material/RequestPageOutlined';
import '../Home.css'
import { Link } from 'react-router-dom';

export function TempEncargado() {
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
  const menuItems = [
    { text: 'Nueva Rama', icon: <AddBoxIcon />, path: '/crear-rama' },
    { text: 'Editar Rama', icon: <ModeEditIcon />, path: '/editar-rama' },
    { text: 'Nuevo Recinto Deportivo', icon: <PlaylistAddOutlinedIcon />, path: '/crear-espacio' },
    { text: 'Gestionar Solicitudes de Recursos', icon: <RequestPageOutlinedIcon />, path: '/gestionar-recursos' },
    { text: 'Ver Solicitudes de Recintos Deportivos', icon: <LibraryAddOutlinedIcon />, path: '/ver-espacio' },
    { text: 'Ver Solicitudes de Implemento', icon: <RemoveRedEyeOutlinedIcon />, path: '/home-encargado' },

  ];
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={() => toggleDrawer(anchor, false)}
      onKeyDown={() => toggleDrawer(anchor, false)}
    >
      <List>
        {menuItems.map(({ text, icon, path }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={path}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon className='menu' style={{ color: 'white' }} />
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
export default TempEncargado;