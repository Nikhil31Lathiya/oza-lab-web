import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import viewTestAction from "../Actions/ViewTests";
import deleteTests from "../Actions/DeleteTests";
import GetTestById from "../Actions/GetTestById";

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

const ViewTestsTable = () => {
  const [test, setTest] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);

  const navigate = useNavigate();
  let sno = 0;
  useEffect(() => {
    const getTests = async () => {
      const test = await viewTestAction();
      setTest(test.data);
    };
    getTests();
  }, [deleted]);

  const edit = async (id) => {
    const { data } = await GetTestById(id);
    navigate("/test/viewTest/edit", { state: data });
  };

  const deleteTest = (id) => {
    setId(id);
    setOpen(true);
  };

  const handleDelete = async () => {
    const { data } = await deleteTests(id);
    if (data) {
      setDeleted(!deleted);
      setOpen(false);
    }
  };

  const handleClose = async (id) => {
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
            <b>Short Name</b>
          </ListItemText>
          <ListItemText style={style}>
            <b>Price</b>
          </ListItemText>
          <ListItemText style={style}>
            <b>Is Active</b>
          </ListItemText>
          <ListItemText style={style}>
            <b>Actions</b>
          </ListItemText>
        </ListItem>
        {test.map((test, index) => {
          return (
            <ListItem key={index}>
              <ListItemText style={style}>{(sno += 1)}</ListItemText>
              <ListItemText style={style}>{test.name}</ListItemText>
              <ListItemText style={style}>{test.shortName}</ListItemText>
              <ListItemText style={style}>{test.price}</ListItemText>
              <ListItemText style={style}>{test.isActive === true ? 'Active' : 'InActive'}</ListItemText>
              <ListItemText style={style}>
                <span
                  style={{
                    backgroundColor: test.isActive === true ? "green" : "red", color: 'white'
                  }}
                >
                  {test.isActive === true ? "Active" : "InActive"}
                </span>
              </ListItemText>
              <ListItemText style={style}>
                <Button onClick={() => edit(test.id)}>
                  <EditIcon />
                </Button>
                <Button onClick={() => deleteTest(test.id)}>
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
                    {"Are you sure you want to delete this Test?"}
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
        })}
      </List>
    </Main>
  );
};

export default ViewTestsTable;
