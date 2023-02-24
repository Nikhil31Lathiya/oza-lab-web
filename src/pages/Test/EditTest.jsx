import React, { useState } from "react";
import DashboardItem from "../../components/DashboardItem";
import Navbar from "../../components/Navbar";
// import Sidebar from '../../components/Sidebar'
import { styled } from "@mui/material/styles";
import AddPatientForm from "../../components/AddPatientForm";
import ViewPatients from "../../components/ViewPatientsTable";
import ViewPatientsTable from "../../components/ViewPatientsTable";
import EditPatients from "../../components/ViewPatientsTable/EditPatients";
import EditTestForm from "../../components/EditTestForm";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-240px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);
const EditTest = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Navbar open={open} setOpen={setOpen} />
      <Main open={open}>
        <EditTestForm />
      </Main>
    </>
  );
};

export default EditTest;
