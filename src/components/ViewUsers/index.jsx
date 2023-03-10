import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import viewPatientAction from "../Actions/ViewPatients";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GetPatientById from "../Actions/GetPatientById";
import { useNavigate } from "react-router-dom";
import deletePatients from "../Actions/DeletePatients";
import deleteUser from "../Actions/DeleteUser";
import DropDown from "../Dropdown";
import viewUserAction from "../Actions/ViewUsers";
import GetUserById from "../Actions/GetUserById";
import PermissionContext from "../../context/PermissionContext";

const style = {
  width: "100px",
};

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `240px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const ViewUserTable = () => {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const navigate = useNavigate();
  let sno = 0;
  useEffect(() => {
    const getUsers = async () => {
      const users = await viewUserAction();
      setUsers(users.data);
    };
    getUsers();
  }, [deleted]);

  const edit = async (id) => {
    const { data } = await GetUserById(id);
    navigate("/user/viewUser/edit", { state: data });
  };

  const deleteUserById = async (id) => {
    setId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    const { data } = await deleteUser(id);
    setDeleted(!deleted);
    setOpen(false);
  };

  return (
    <Main>
      <List>
        <ListItem>
          <ListItemText style={style}>
            <b>Sr No.</b>
          </ListItemText>
          <ListItemText style={style}>
            <b>Name</b>
          </ListItemText>
          <ListItemText style={style}>
            <b>Email</b>
          </ListItemText>
          <ListItemText style={style}>
            <b>Contact</b>
          </ListItemText>
          <ListItemText style={style}>
            <b>Role</b>
          </ListItemText>
          <ListItemText style={style}>
            <b>Actions</b>
          </ListItemText>
        </ListItem>
        {users.length > 0 ? (
          users.map((user, index) => {
            // user.roleId === 1 ? setRole("SUPER ADMIN") : user.roleId === 2 ? setRole("ADMIN") : setRole("USER")
            return (
              <ListItem key={index}>
                {/* <ListItemText style={style} hidden={true}>{patient.id}</ListItemText> */}
                <ListItemText style={style}>{(sno += 1)}</ListItemText>
                <ListItemText style={style}>
                  {user.title} {user.firstName} {user.lastName}
                </ListItemText>
                <ListItemText style={style}>{user.email}</ListItemText>
                <ListItemText style={style}>{user.contact}</ListItemText>
                <ListItemText style={style}>
                  {user.roleId === 1
                    ? "SUPER ADMIN"
                    : user.roleId === 2
                    ? "ADMIN"
                    : "USER"}
                </ListItemText>
                <ListItemText style={style}>
                  <Button onClick={() => edit(user.id)}>
                    <EditIcon />
                  </Button>
                  <Button onClick={() => deleteUserById(user.id)}>
                    <DeleteIcon />
                  </Button>
                  <Dialog
                    style={{ margin: "20px" }}
                    className="MuiDialog-root"
                    open={open}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle>
                      {"Are you sure you want to delete this user?"}
                    </DialogTitle>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={() => handleDelete()}>
                        Confirm Delete
                      </Button>
                    </DialogActions>
                  </Dialog>
                </ListItemText>
              </ListItem>
            );
          })
        ) : (
          <ListItem key={"00010101010"}>
            <ListItemText style={style}>{"No USER Found"}</ListItemText>{" "}
          </ListItem>
        )}
      </List>
    </Main>
  );
};

export default ViewUserTable;
