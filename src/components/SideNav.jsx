import {useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Home from '../pages/Home';
import { FaHome, FaVideo } from 'react-icons/fa';
import Shorts from '../pages/Shorts';
import { PiStudentFill  } from "react-icons/pi";
import ListSubheader from '@mui/material/ListSubheader';
import Collapse from '@mui/material/Collapse';
import { FcDataConfiguration } from "react-icons/fc";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { IoIosAdd } from "react-icons/io";
import { MdReceiptLong } from "react-icons/md";
import { BiSolidDiscount } from "react-icons/bi";
import { CiCalendarDate } from "react-icons/ci";
import { FaMoneyBill1 } from "react-icons/fa6";
import { FaUserGear } from "react-icons/fa6";
import { FaCriticalRole } from "react-icons/fa";
import { HiMiniAcademicCap } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import Medium from '../GlobalConfigs/Medium';
import Section from '../GlobalConfigs/Section';
import { Container, Grid } from '@mui/material';

const drawerWidth = 260;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function SideNav() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [menuData, setMenuData] = useState('Home')
  const [isGBCollapsed, setIsGBCollapsed] = useState(false);

  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleGBDropdownClose = () => {
    setIsGBCollapsed(!isGBCollapsed);
  };
  
  const globalConfigurationList = ['Medium','Section','Grade','Category','Cast','Bank','Divider','Fee Head','Discount Head','Fine','Divider','Academic Year','Month-Map','Divider','Add User','Role*','Page Access*'];

  return (
    <>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed"
            elevation={4} 
            sx={{
                backgroundColor: '#ffffff', color: "#2f2f2f"  
            }}>
                <Toolbar sx={{
                  pr: '24px', // keep right padding when drawer closed
                }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={()=>{setOpen(!open)}}
                    edge="start"  
                    sx={{
                      marginRight: '36px',
                      /* ...(open && { display: 'none' }), */
                    }}                  
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    {/* <img src="./logo1.png" alt="logo" height={40} /> */}
                    UAIC
                </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open} sx={{
              color: 'white', 
              background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)', // This creates a gradient background
              boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)', // This creates a subtle shadow
              padding: '10px'
            }}>
                <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
                </DrawerHeader>
                <Divider />
                <List component='nav' aria-labelledby="nested-list-subheaderGLBCONF"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheaderGLBCONF">
                        Global Configuration
                        </ListSubheader>
                    }>  
                    <ListItem key='Global Configuration' disablePadding sx={{ display: 'block' }} onClick={handleGBDropdownClose}>
                        <ListItemButton
                            sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                            }}
                        >
                            <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                            >
                            <FcDataConfiguration />
                            </ListItemIcon>
                            <ListItemText primary='Global Configuration' />
                            {isGBCollapsed? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                    </ListItem>     
                    <Collapse in={isGBCollapsed} timeout="auto" unmountOnExit>
                        {globalConfigurationList.map((text, index) => (
                            text==='Divider'?<Divider />:
                            <ListItem key={text} disablePadding sx={{ display: 'block' }} onClick={() => setMenuData(text)}>
                            <ListItemButton
                                sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                }}
                                component={Link}
                                to={text?.toLowerCase()}
                            >
                                <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}                                
                                >
                                    
                                {index===7?<MdReceiptLong />:
                                (index===8?<BiSolidDiscount />:
                                (index===10?<CiCalendarDate />:
                                (index===9?<FaMoneyBill1 />:
                                (index===11?<HiMiniAcademicCap />:
                                (index===14?<FaUserGear />:
                                (index===15?<FaCriticalRole />:
                                (<IoIosAdd />)))))))}    
                                 
                                
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                            </ListItem>
                            
                        ))}
                    </Collapse>         
                    
                    
                </List>
                <List component='nav' aria-labelledby="nested-list-subheaderGLBCONF"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheaderGLBCONF">
                            Other Configuration
                        </ListSubheader>
                    }
                >
                    <ListItem key='Shorts' disablePadding sx={{ display: 'block' }} onClick={() => setMenuData('Shorts')}>
                    <ListItemButton
                        sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                        }}
                        component={Link}
                        to="shorts"
                    >
                        <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                        >
                        <FaVideo />
                        </ListItemIcon>
                        <ListItemText primary='Shorts' />
                    </ListItemButton>
                    </ListItem>
                </List>
                    
                
                
                <Divider />
                                

                <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setMenuData('Student')}>
                    <ListItemButton
                        sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                        }}
                    >
                        <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                        >
                        <PiStudentFill  />
                        </ListItemIcon>
                        <ListItemText primary='Student' />
                    </ListItemButton>
                    </ListItem>

            </Drawer>
            <Box component="main" /* sx={{ flexGrow: 1, p: 3 }} */
            sx={{              
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
            >
              {/* <Container maxWidth="lg" width="100%" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8} lg={9}>
                    {menuData === 'Home' && <Home />}
                    {menuData === 'Shorts' && <Shorts />}
                    {menuData === 'Medium' && <Medium />}
                    {menuData === 'Section' && <Section />}
                  </Grid>
                </Grid>
              </Container> */}
                    
            </Box>
        </Box>
    </>
    
  );
}