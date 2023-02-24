import {
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import viewPatientAction from "../Actions/ViewPatients";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GetPatientById from "../Actions/GetPatientById";
import { useNavigate } from "react-router-dom";
import deletePatients from "../Actions/DeletePatients";
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
    // marginLeft: `-${drawerWidth}px`,
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

  const navigate = useNavigate();
  let sno = 0;
  useEffect(() => {
    const getTests = async () => {
      const test = await viewTestAction();
      console.log(test.data);
      setTest(test.data);
    };
    getTests();
  }, [deleted]);

  const edit = async (id) => {
    const { data } = await GetTestById(id);
    console.log(data);
    navigate("/test/viewTest/edit", { state: data });
  };

  const deleteTest = async (id) => {
    const { data } = await deleteTests(id);
    console.log(data);
    setDeleted(!deleted);
  };

  return (
    <Main>
      <List>
        <ListItem>
          <ListItemText style={style}><b>Sr No.</b></ListItemText>
          <ListItemText style={style}><b>Name</b></ListItemText>
          <ListItemText style={style}><b>Short Name</b></ListItemText>
          <ListItemText style={style}><b>Price</b></ListItemText>
          <ListItemText style={style}><b>Actions</b></ListItemText>
        </ListItem>
        {test.map((test, index) => {
          return (
            <ListItem key={index}>
              {/* <ListItemText style={style} hidden={true}>{patient.id}</ListItemText> */}
              <ListItemText style={style}>{(sno += 1)}</ListItemText>
              <ListItemText style={style}>
                {test.name}
              </ListItemText>
              <ListItemText style={style}>{test.shortName}</ListItemText>
              <ListItemText style={style}>{test.price}</ListItemText>
              <ListItemText style={style}>
                <Button onClick={() => edit(test.id)}>
                  <EditIcon />
                </Button>
                <Button onClick={() => deleteTest(test.id)}>
                  <DeleteIcon />
                </Button>
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    </Main>
  );
};

export default ViewTestsTable;
