import {
  Button,
  List,
  ListItem,
  ListItemButton,
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

const ViewPatientsTable = () => {
  const [patients, setPatients] = useState([]);
  const [deleted, setDeleted] = useState([]);

  const navigate = useNavigate();
  let sno = 0;
  useEffect(() => {
    const getPatients = async () => {
      const patients = await viewPatientAction();
      console.log(patients.data);
      setPatients(patients.data);
    };
    getPatients();
  }, [deleted]);

  const edit = async (id) => {
    const { data } = await GetPatientById(id);
    console.log(data);
    navigate("/patient/viewPatient/edit", { state: data });
  };

  const deletePatient = async (id) => {
    const { data } = await deletePatients(id);
    console.log(data);
    setDeleted(!deleted);
  };

  return (
    <Main>
      <List>
        <ListItem>
          <ListItemText style={style}><b>Sr No.</b></ListItemText>
          <ListItemText style={style}><b>Name</b></ListItemText>
          <ListItemText style={style}><b>Email</b></ListItemText>
          <ListItemText style={style}><b>Contact</b></ListItemText>
          <ListItemText style={style}><b>Actions</b></ListItemText>
        </ListItem>
        {patients.map((patient, index) => {
          return (
            <ListItem key={index}>
              {/* <ListItemText style={style} hidden={true}>{patient.id}</ListItemText> */}
              <ListItemText style={style}>{(sno += 1)}</ListItemText>
              <ListItemText style={style}>
                {patient.title} {patient.firstName} {patient.lastName}
              </ListItemText>
              <ListItemText style={style}>{patient.email}</ListItemText>
              <ListItemText style={style}>{patient.contact}</ListItemText>
              <ListItemText style={style}>
                <Button onClick={() => edit(patient.id)}>
                  <EditIcon />
                </Button>
                <Button onClick={() => deletePatient(patient.id)}>
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

export default ViewPatientsTable;
