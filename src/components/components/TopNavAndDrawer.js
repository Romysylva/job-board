import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ThemeContext } from "../context/ThemeContext";

const drawerWidth = 340;

const DynamicDrawer = ({ menuItems, onSelectedTab, children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [openListItems, setOpenListItems] = useState([]);
  const [selectedTab, setSelectedTab] = useState(menuItems[0]?.text || "Home");
  const { toggleTheme } = useContext(ThemeContext);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    toggleTheme();
  };

  const handleListItemToggle = (item) => {
    setOpenListItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    onSelectedTab && onSelectedTab(tab);
    setMobileOpen(false);
  };

  const drawer = (
    <div>
      <Toolbar />
      <div className="text-xl font-bold text-blue-600 dark:text-blue-400 -mt-8 ml-8 mb-8">
        <a href="/">JobBoard</a>
      </div>
      <Divider />
      <List>
        {menuItems.map((menuItem) => (
          <div key={menuItem.text}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={
                  menuItem.subItems
                    ? () => handleListItemToggle(menuItem.text)
                    : () => handleTabClick(menuItem.text)
                }
              >
                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                <ListItemText primary={menuItem.text} />
                {menuItem.subItems &&
                  (openListItems.includes(menuItem.text) ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  ))}
              </ListItemButton>
            </ListItem>
            {menuItem.subItems && (
              <Collapse
                in={openListItems.includes(menuItem.text)}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {menuItem.subItems.map((subItem) => (
                    <ListItemButton
                      key={subItem.text}
                      sx={{ pl: 4 }}
                      onClick={() => handleTabClick(subItem.text)}
                    >
                      <ListItemIcon>{subItem.icon}</ListItemIcon>
                      <ListItemText primary={subItem.text} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </div>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                {selectedTab}
              </Typography>
              <IconButton
                color="inherit"
                onClick={handleDarkModeToggle}
                sx={{ ml: "auto" }}
              >
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="menu items"
          >
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <Toolbar />
            {/* <Typography variant="h4">{selectedTab}</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              This is the content for the "{selectedTab}" tab. Customize this
              section based on your requirements.
            </Typography> */}
            <Toolbar />

            {children}
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default DynamicDrawer;
