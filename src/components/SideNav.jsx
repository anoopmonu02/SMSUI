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
import { FaHome, FaVideo } from 'react-icons/fa';
import { PiStudentFill  } from "react-icons/pi";
import ListSubheader from '@mui/material/ListSubheader';
import Collapse from '@mui/material/Collapse';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import WebhookIcon from '@mui/icons-material/Webhook';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { HiMiniAcademicCap } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import Avatar from '@mui/material/Avatar';
import { Button, Tooltip, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import customaxios from '../Axios/customaxios';

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
  const [isOCCollapsed, setIsOCCollapsed] = useState(false);
  const [isSCCollapsed, setIsSCCollapsed] = useState(false);

  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  //const history = useHistory();
  const settings = ['Profile','Logout'];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleGBDropdownClose = () => {
    setIsGBCollapsed(!isGBCollapsed);
  };

  const handleOCDropdownClose = () => {
    setIsOCCollapsed(!isOCCollapsed);
  };
  const handleSCDropdownClose = () => {
    setIsSCCollapsed(!isSCCollapsed);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    console.log(anchorElUser);
  };
  const handleCloseUserMenu = () => {
    console.log("-------------------")
    setAnchorElUser(null);
  };
  const handleLogout = async() =>{    
    setAnchorElUser(null);
    console.log('Clicked outside menu');
    await customaxios.post('api/v1/auth/logout/',{
      refresh_token: localStorage.getItem('refresh_token')
    }).then(response => {
      // Check if the logout was successful (you might need to adjust this condition based on your API response)
      if (response.status === 200) {
        // Navigate to the desired page
        navigate('/');
      } else {
        // Handle logout error
        console.error('Logout failed:', response.data);
      }
    })
    .catch(error => {
      // Handle fetch error
      console.error('Logout request failed:', error);
    });
    console.log("res ");
  }
  
  const globalConfigurationList = ['Medium','Section','Grade','Category','Cast','Bank','Divider','Fee Head','Discount Head','Fine','Divider','Academic Year','Month Map','Divider','Add User','Role*','Page Access*'];
  const otherConfigurationList = ['Fee Class','Fee Month','Fee Date','Divider','Discount Class', 'Discount Month']
  const studentConfigurationList = ['Registration', 'Migration','Update Aadhar Details','Update Student','Assign Discount']

  const branchname = localStorage.getItem('branch_name');
  const username = localStorage.getItem('username');
 
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          elevation={4}
          sx={{
            backgroundColor: "#ffffff",
            color: "#2f2f2f",
          }}
        >
          <Toolbar
            sx={{
              justifyContent: "space-between",
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              //color="inherit"
              color="success"
              aria-label="open drawer"
              onClick={() => {
                setOpen(!open);
              }}
              edge="start"
              sx={{
                marginRight: "36px",
                /* ...(open && { display: 'none' }), */
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              noWrap
              component="div"
              color="success.main"
            >
              {/* <img src="./logo1.png" alt="logo" height={40} /> */}
              {branchname}
            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User Login" src="/static/images/avatar/2.jpg" sx={{ bgcolor: '#43a047' }}/>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  setting === 'Logout' ? (
                    <MenuItem key={setting} onClick={handleLogout}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ) : (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  )
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List
            component="nav"
            aria-labelledby="nested-list-subheaderGLBCONF"
            subheader={
              <ListSubheader
                component="div"
                id="nested-list-subheaderGLBCONF"
                sx={{ color: "success" }}
              >
                Global Configuration
              </ListSubheader>
            }
          >
            <ListItem
              key="Global Configuration"
              disablePadding
              sx={{ display: "block" }}
              onClick={handleGBDropdownClose}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <DisplaySettingsIcon color="success" />
                </ListItemIcon>
                <ListItemText primary="Global Configuration" color="success" />
                {isGBCollapsed ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={isGBCollapsed} timeout="auto" unmountOnExit>
              {globalConfigurationList.map((text, index) =>
                text === "Divider" ? (
                  <Divider />
                ) : (
                  <ListItem
                    key={text}
                    disablePadding
                    sx={{ display: "block" }}
                    onClick={() => setMenuData(text)}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                      component={Link}
                      to={text?.toLowerCase()?.replace(" ", "-")}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {index === 7 ? (
                          <ReceiptLongIcon color="success" />
                        ) : index === 8 ? (
                          <MoneyOffIcon color="success" />
                        ) : index === 12 ? (
                          <CalendarMonthIcon color="success" />
                        ) : index === 9 ? (
                          <LocalAtmIcon color="success" />
                        ) : index === 11 ? (
                          <SchoolRoundedIcon color="success" />
                        ) : index === 14 ? (
                          <ManageAccountsIcon color="success" />
                        ) : index === 15 ? (
                          <WebhookIcon color="success" />
                        ) : index === 16 ? (
                          <AccessibilityIcon color="success" />
                        ) : (
                          <AddCircleIcon color="success" />
                        )}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                )
              )}
            </Collapse>
          </List>

          <List
            component="nav"
            aria-labelledby="nested-list-subheaderGLBCONF"
            subheader={
              <ListSubheader component="div" id="nested-list-subheaderGLBCONF">
                Other Configuration
              </ListSubheader>
            }
          >
            <ListItem
              key="Other Configuration"
              disablePadding
              sx={{ display: "block" }}
              onClick={handleOCDropdownClose}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <SettingsSuggestIcon color="success" />
                </ListItemIcon>
                <ListItemText primary="Other Configuration" />
                {isOCCollapsed ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={isOCCollapsed} timeout="auto" unmountOnExit>
              {otherConfigurationList.map((text, index) =>
                text === "Divider" ? (
                  <Divider />
                ) : (
                  <ListItem
                    key={text}
                    disablePadding
                    sx={{ display: "block" }}
                    onClick={() => setMenuData(text)}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                      component={Link}
                      to={text?.toLowerCase()?.replace(" ", "-")}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {index === 7 ? (
                          <ReceiptLongIcon color="success" />
                        ) : index === 8 ? (
                          <MoneyOffIcon color="success" />
                        ) : index === 12 ? (
                          <CalendarMonthIcon color="success" />
                        ) : index === 9 ? (
                          <LocalAtmIcon color="success" />
                        ) : index === 11 ? (
                          <SchoolRoundedIcon color="success" />
                        ) : index === 14 ? (
                          <ManageAccountsIcon color="success" />
                        ) : index === 15 ? (
                          <WebhookIcon color="success" />
                        ) : index === 16 ? (
                          <AccessibilityIcon color="success" />
                        ) : (
                          <AddCircleIcon color="success" />
                        )}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                )
              )}
            </Collapse>
          </List>

          <List
            component="nav"
            aria-labelledby="nested-list-subheaderGLBCONF"
            subheader={
              <ListSubheader component="div" id="nested-list-subheaderGLBCONF">
                Student Configuration
              </ListSubheader>
            }
          >
            <ListItem
              key="Shorts"
              disablePadding
              sx={{ display: "block" }}
              onClick={() => setMenuData("Shorts")}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                component={Link}
                to="shorts"
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <FaVideo />
                </ListItemIcon>
                <ListItemText primary="Shorts" />
              </ListItemButton>
            </ListItem>
          </List>

          <Divider />

          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => setMenuData("Student")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <PiStudentFill />
              </ListItemIcon>
              <ListItemText primary="Student" />
            </ListItemButton>
          </ListItem>
        </Drawer>
        <Box
          component="main" /* sx={{ flexGrow: 1, p: 3 }} */
          sx={{
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
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