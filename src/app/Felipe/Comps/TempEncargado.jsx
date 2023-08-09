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
import VerSolicitudesImplemento from '../Vistas/VerSolicitudesImplemento.jsx';

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

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Nueva Rama', 'Editar Rama', 'Nuevo Recinto Deportivo', 'Solicitudes de Recursos'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
              {index % 4 === 0 ? <AddBoxIcon /> :
                index % 4 === 1 ? <ModeEditIcon /> :
                index % 4 === 2 ? <PlaylistAddOutlinedIcon /> :
                index % 4 === 3 ? <RequestPageOutlinedIcon /> : null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Nueva Solicitud de Recinto Deportivo', 'Ver Solicitudes de Implemento'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={index === 1 ? Link : 'button'} to="/ver-solicitudes-implemento">
              <ListItemIcon>
                {index % 2 === 0 ? <LibraryAddOutlinedIcon /> : <RemoveRedEyeOutlinedIcon />}
              </ListItemIcon>
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
export default TempEncargado;