import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useNavigate } from "react-router-dom";
import { Button, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore, Settings } from "@mui/icons-material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SummarizeIcon from "@mui/icons-material/Summarize";
import LogoutIcon from "@mui/icons-material/Logout";
import DescriptionIcon from "@mui/icons-material/Description";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const NavBar = ({ open, setOpen }) => {
  const theme = useTheme();
  // const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [openCollapse, setOpenCollapse] = React.useState(false);
  const [openUserCollapse, setOpenUserCollapse] = React.useState(false);
  const [openTestCollapse, setOpenTestCollapse] = React.useState(false);
  const [openReportsCollapse, setOpenReportsCollapse] = React.useState(false);

  function handleOpenSettings() {
    setOpenCollapse(!openCollapse);
  }

  function handleUserOpenSettings() {
    setOpenUserCollapse(!openUserCollapse);
  }

  function handleOpenTestsSettings() {
    setOpenTestCollapse(!openTestCollapse);
  }

  function handleOpenReportsSettings() {
    setOpenReportsCollapse(!openReportsCollapse);
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Button
            onClick={() => navigate("/dashboard")}
            variant="h6"
            noWrap
            component="div"
          >
            OZA-LAB
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          {/* <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", flex: '1' }}> */}
          {/* <Button onClick={() => {
              navigate('/dashboard')
            }}>
              OZA-LAB
            </Button> */}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
          {/* </div> */}
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem key={1} disablePadding>
            <ListItemButton onClick={() => navigate("/dashboard")}>
              <ListItemIcon>{<DashboardIcon />}</ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </ListItem>
          {/* <ListItem key={1} disablePadding>
            <ListItemButton onClick={() => navigate("/patient")}>
              <ListItemIcon>{<PersonIcon />}</ListItemIcon>
              <ListItemText primary={"Patients"} />
            </ListItemButton>
          </ListItem> */}
          <ListItem button onClick={handleUserOpenSettings}>
            <ListItemIcon>{<PersonIcon />}</ListItemIcon>
            <ListItemText primary="Users" />
            {openUserCollapse ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openUserCollapse} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton onClick={() => navigate("/user/addUser")}>
                {/* <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon> */}
                <ListItemText inset primary="Add User" />
              </ListItemButton>
              <ListItemButton onClick={() => navigate("/user/viewUser")}>
                {/* <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon> */}
                <ListItemText inset primary="View User" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItem button onClick={handleOpenSettings}>
            <ListItemIcon>{<PersonIcon />}</ListItemIcon>
            <ListItemText primary="Patients" />
            {openCollapse ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openCollapse} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton onClick={() => navigate("/patient/addPatient")}>
                {/* <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon> */}
                <ListItemText inset primary="Add Patient" />
              </ListItemButton>
              <ListItemButton onClick={() => navigate("/patient/viewPatient")}>
                {/* <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon> */}
                <ListItemText inset primary="View Patient" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItem button onClick={handleOpenTestsSettings}>
            <ListItemIcon>{<PersonIcon />}</ListItemIcon>
            <ListItemText primary="Tests" />
            {openTestCollapse ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openTestCollapse} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton onClick={() => navigate("/test/addTest")}>
                {/* <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon> */}
                <ListItemText inset primary="Add Test" />
              </ListItemButton>
              <ListItemButton onClick={() => navigate("/test/viewTest")}>
                {/* <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon> */}
                <ListItemText inset primary="View Test" />
              </ListItemButton>
            </List>
          </Collapse>
          {/* <ListItem key={1} disablePadding>
            <ListItemButton>
              <ListItemIcon>{<SummarizeIcon />}</ListItemIcon>
              <ListItemText primary={"Reports"} />
            </ListItemButton>
          </ListItem> */}
          <ListItem button onClick={handleOpenReportsSettings}>
            <ListItemIcon>{<DescriptionIcon />}</ListItemIcon>
            <ListItemText primary="Reports" />
            {openReportsCollapse ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openReportsCollapse} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton onClick={() => navigate("/reports/AddReport")}>
                {/* <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon> */}
                <ListItemText inset primary="Create report" />
              </ListItemButton>
              <ListItemButton onClick={() => navigate("/reports/ViewReport")}>
                {/* <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon> */}
                <ListItemText inset primary="View Reports" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* --------------- */}
          <ListItem key={1} disablePadding>
            <ListItemButton onClick={() => navigate("/")}>
              <ListItemIcon>{<LogoutIcon />}</ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={1} disablePadding>
            <ListItemButton onClick={() => navigate("/jsonInput")}>
              <ListItemIcon>{<LogoutIcon />}</ListItemIcon>
              <ListItemText primary={"CONVERT to JSON"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          {/* {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))} */}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {/* <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography> */}
      </Main>
    </Box>
  );
};

export default NavBar;
